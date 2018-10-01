angular.module('mrbaffo.user.account').controller('paymentController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q) {
    $scope.addNewCard = false;
    $scope.billingForm = false;
    $scope.stripeInfo = {};

    $scope.createNewCard = function(flag){
        $scope.addNewCard = flag;
        if(flag === false){
            $scope.billingForm = flag;
        }
    };

    $scope.paymentInfo =undefined;

    $scope.$watch('paymentInfo.goodThru', function () {
        if($scope.paymentInfo !== undefined){
            $scope.paymentInfo.formattedExpiry = $scope.paymentInfo.goodThru;

            if($scope.paymentInfo.goodThru.length === 2){
                $scope.paymentInfo.formattedExpiry = $scope.paymentInfo.formattedExpiry + '/'
            }
        }
    });

    $scope.getStripeInfo = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/users/me/payment'
        };

        $http(req).then(function(res){
            $scope.stripeInfo = res.data;
            console.log($scope.stripeInfo);
        });
    };

    $scope.getStripeInfo();


    $scope.setDefaultCard = function(card){
        var req = {
            method: "PUT",
            url: APP_CONFIG.apiUrl + '/users/me/payment/default',
            data: {
                cardId: card.id
            }
        };

        $http(req).then(function(res){
            if(res.status){
                $scope.getStripeInfo();
            }
        });

    };

    $scope.deleteCard = function(card){
        var confirmDel = confirm("Are you sure you would like to delete the card ending in " +card.last4 +"?");

        if(confirmDel){
            var req = {
                method: "DELETE",
                url: APP_CONFIG.apiUrl + '/users/me/payment/deleteCard/' + card.id
            };

            $http(req).then(function(res){
                console.log(res);
                if(res.status){
                    // $scope.getStripeInfo();
                    // $scope.$apply();
                }
                $scope.getStripeInfo();
            });
        }
    };

    $scope.editCard = function(card){
        console.log(card);
        var req = {
            method: "PUT",
            url: APP_CONFIG.apiUrl + '/users/me/payment/editCard/' + card.id,
            data: {
                cardId: card.id,
                expMonth: card.goodThru.split('/')[0],
                expYear:  card.goodThru.split('/')[1],
                name: card.name,
                zip: card.address_zip
            }
        };

        console.log(req);

        $http(req).then(function(res){
            if(res.status){
                $scope.getStripeInfo();
                $scope.editedCard = undefined;
            }
        });
    };

    $scope.continueToBilling = function(){
        $scope.billingForm = true;
    };

    $scope.selectedCard = {};
    $scope.editedCard = undefined;

    $scope.showSelectedCard = function(card){
        //hide
        if($scope.selectedCard === card){
            $scope.selectedCard = {};
        }
        //show
        else{
            $scope.selectedCard = card;
        }
        $scope.editedCard = undefined;
    };

    $scope.showEditedCard = function(card){
        if($scope.editedCard === card){
            $scope.editedCard = undefined;
        }else{
            $scope.editedCard = card;
            $scope.editedCard.goodThru = $scope.editedCard.exp_month + "/" + $scope.editedCard.exp_year%100;
            $scope.editedCard.formattedExpiry = $scope.editedCard.goodThru
        }
    };

    $scope.$watch('editedCard.goodThru', function () {
        if($scope.editedCard !== undefined){
            $scope.editedCard.formattedExpiry = $scope.editedCard.goodThru;
            if($scope.editedCard.goodThru.length === 2){
                $scope.editedCard.formattedExpiry = $scope.editedCard.formattedExpiry + '/'
            }
        }
    });

    $scope.savePayment = function(info){
        console.log(info);
        var expiryMonth = info.goodThru.split('/')[0];
        var expiryYear = info.goodThru.split('/')[1];

        var req =  {
            method: "POST",
            url: APP_CONFIG.apiUrl + '/users/me/payment',
            data: {
                cardNumber: info.cardNumber,
                expMonth: expiryMonth,
                expYear: expiryYear,
                cvc: info.cvc,
                name: info.fullName,
                zip: info.postal
            }
        };

        console.log(req);

        $http(req).then(function(res){
            console.log(res);
            $scope.paymentInfo = {};
            $scope.addNewCard = false;
            $scope.getStripeInfo();
        })
    };
});
