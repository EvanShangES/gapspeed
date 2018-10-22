angular.module('mrbaffo.user.order').controller('newOrderController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q){
    console.log($stateParams);
    console.log($rootScope.userInfo);

    $scope.orderComplete = false;

    $scope.request = {
        address: {},
        pickup: undefined,
        delivery: undefined,
        serviceNotes: "",
        products: [],
        productNotes: "",
        quantity: undefined,
        payment: {}
    };

    $scope.addressTypeOptions = [
        { name: 'Home', value: 'home' },
        { name: 'Office', value: 'office' },
        { name: 'Other', value: 'other' }
    ];

    $scope.loadAreaTypes = function(){
        var dfd = $q.defer();

        var areaTypes = {
            initialized: dfd.promise,
            data: undefined
        };

        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + "/serviceAreaTypes"
        };

        $http(req).then(function (res) {
            console.log(res);

            areaTypes.data = res.data;
            dfd.resolve(areaTypes);
        });

        return areaTypes;
    };

    $scope.locationEdit = undefined;
    var loadedAreaTypes = $scope.loadAreaTypes();

    loadedAreaTypes.initialized.then(function(){
        $scope.areaTypes = loadedAreaTypes.data;

        if($stateParams.orderBox !== null && $rootScope.userInfo.addressInfo){
            $scope.addressType = $stateParams.orderBox;
            $scope.request.address = angular.copy($rootScope.userInfo.addressInfo[$stateParams.orderBox]);
            $scope.locationEdit = false;
        }else
            if($stateParams.orderBox && !$rootScope.userInfo.addressInfo){
            $scope.locationEdit = true;
            $scope.addressType = $stateParams.orderBox
        }else{
            $scope.locationEdit = true;
            $scope.addressType = $scope.areaTypes[0].name;
        }
    });


    $scope.locationFocus = true;
    $scope.timeFocus = false;
    $scope.serviceFocus = false;
    $scope.paymentFocus = false;

    $scope.editFocus = function(selection){
        if(selection === 'location'){
            $scope.locationFocus = true;
            $scope.timeFocus = false;
            $scope.serviceFocus = false;
            $scope.paymentFocus = false;
        }

        if(selection === 'time'){
            $scope.locationFocus = false;
            $scope.timeFocus = true;
            $scope.serviceFocus = false;
            $scope.paymentFocus = false;
        }

        if(selection === 'service'){
            $scope.locationFocus = false;
            $scope.timeFocus = false;
            $scope.serviceFocus = true;
            $scope.paymentFocus = false;
        }

        if(selection === 'payment'){
            $scope.locationFocus = false;
            $scope.timeFocus = false;
            $scope.serviceFocus = false;
            $scope.paymentFocus = true;
        }
    };

    $scope.editFlag = function(selection){
        if(selection === 'location'){
            $scope.locationEdit = true;
        }
    };

    $scope.$watch('locationFocus', function(){
        $('#locationForm').slideToggle("slow");
    });

    $scope.$watch('request.address.postal', function(){
        var regex = new RegExp(/[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/);
        if (regex.test($scope.request.address.postal)){
            $scope.request.address.postal = $scope.request.address.postal.toUpperCase();
            console.log($scope.request.address.postal)
        }
    });

    $scope.$watch('timeFocus', function(){
        if(!$('#timeForm').is(':visible') && $scope.timeFocus){
            $('#timeForm').slideDown("slow");
        }else if($('#timeForm').is(':visible') && !$scope.timeFocus){
            $('#timeForm').slideUp("slow");
        }
    });

    $scope.$watch('serviceFocus', function(){
        if(!$('#serviceForm').is(':visible') && $scope.serviceFocus){
            $('#serviceForm').slideDown("slow");
        }else if($('#serviceForm').is(':visible') && !$scope.serviceFocus){
            $('#serviceForm').slideUp("slow");
        }
    });

    $scope.$watch('paymentFocus', function(){
        if(!$('#paymentForm').is(':visible') && $scope.paymentFocus){
            $('#paymentForm').slideDown("slow");
        }else if($('#serviceForm').is(':visible') && !$scope.paymentFocus){
            $('#paymentForm').slideUp("slow");
        }
    });

    $scope.$watch('addressType', function(){
        if($rootScope.userInfo.addressInfo && $rootScope.userInfo.addressInfo[$scope.addressType]){
            $scope.request.address = angular.copy($rootScope.userInfo.addressInfo[$scope.addressType]);
            $scope.locationEdit = false;
        }else{
            $scope.request.address = {};
            $scope.locationEdit = true;
        }

        //make sure request object is empty
        $scope.withinServiceArea = null;
        $scope.request.pickup = undefined;
        $scope.request.delivery = undefined;
        $scope.request.serviceNotes = "";
        $scope.request.products = [];
        $scope.request.productNotes = "";
        $scope.request.quantity = undefined;
        $scope.request.payment = {};
    });

    $scope.currentAddress = undefined;
    $scope.conciergeTimeFlag = false;
    $scope.withinServiceArea = null;

    $scope.confirmAddress = function(address, type){
        // console.log($scope.request);
        // console.log($rootScope.userInfo.addressInfo[type]);
        // console.log(address);

        var req = {
            method: 'GET',
            url: APP_CONFIG.apiUrl + '/addressCheck/' + address.address + '/' + address.city + '/' + type
        };

        $http(req).then(function (res) {
            console.log(res);
            if (res.data.success) {
                $scope.withinServiceArea = true;
                // console.log($rootScope.userInfo.addressInfo);
                // console.log($rootScope.userInfo.addressInfo[type]);
                // console.log($rootScope.userInfo.addressInfo[type] !== address);

                if(!$rootScope.userInfo.addressInfo || $rootScope.userInfo.addressInfo[type] !== address) {
                    console.log('not same address');
                    saveAddress(type, address);
                }

                if($scope.request.address.conciergeReq && $scope.request.address.conciergeAccept){
                    $scope.request.pickup = res.data.area.serviceTime.pickup;
                    $scope.request.delivery = res.data.area.serviceTime.delivery;
                    $scope.request.serviceNotes = res.data.area.serviceTime.notes;

                    $scope.conciergeTimeFlag = true;
                    $scope.locationEdit = false;
                    $scope.locationFocus = false;
                    $scope.timeFocus = true;
                }else{
                    if(res.data.area.conciergeReq){
                        $scope.request.pickup = res.data.area.otherServiceTime.pickup;
                        $scope.request.delivery = res.data.area.otherServiceTime.delivery;
                        $scope.request.serviceNotes = res.data.area.otherServiceTime.notes;

                        $scope.conciergeTimeFlag = false;
                        $scope.locationEdit = false;
                        $scope.locationFocus = false;
                        $scope.timeFocus = true;
                    }else {
                        $('#noConciergeModal').modal({backdrop: 'static', keyboard: false});
                    }
                }

            }else{
                $scope.withinServiceArea = false;
            }
        });

        function saveAddress (type, address){
            var req = {
                method: 'PUT',
                url: APP_CONFIG.apiUrl + '/address/' + $rootScope.userId + '/' + type,
                data: address
            };

            $http(req).then(function(res){
                console.log(res);
                if(res.data){

                }
            });
        }

    };

    $scope.confirmTime = function(){
        $scope.timeFocus = false;
        $scope.serviceFocus = true;
    };


    $scope.serviceSelection = {
        wash: false,
        shirt: {
            selected: false,
            press: "Laundry & Press"
        },
        dry: false,
        shoes: false,
        notes: ""
    };

    $scope.noProductsFlag = true;

    $scope.loadProducts = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/products'
        };

        $http(req).then(function(res){
            // console.log(res);
            $scope.products = res.data;
            console.log($scope.products);
        });
    };

    $scope.loadProducts();

    $scope.selectService = function(service){
        if(service === 'wash'){
            $scope.serviceSelection.wash = !$scope.serviceSelection.wash;
        }
        if(service === 'shirt'){
            $scope.serviceSelection.shirt.selected = !$scope.serviceSelection.shirt.selected;
        }
        if(service === 'dry'){
            $scope.serviceSelection.dry = !$scope.serviceSelection.dry;
        }
        if(service === 'shoes'){
            $scope.serviceSelection.shoes = !$scope.serviceSelection.shoes;
        }
    };

    $scope.selectShirtService = function(service){
        if(service === 'laundry'){
            $scope.serviceSelection.shirt.press = "Laundry & Press";
        }
        if(service === 'hand'){
            $scope.serviceSelection.shirt.press = 'Hand Press';
        }
        if(service === 'dry'){
            $scope.serviceSelection.shirt.press = "Dry Clean";
        }
    };

    // $scope.$watch('serviceSelection', function(){
    //     console.log($scope.serviceSelection);
    //     if(!$scope.serviceSelection.wash && !$scope.serviceSelection.dry && !$scope.serviceSelection.shoes){
    //         $scope.noProductsFlag = true;
    //     }else{
    //         $scope.noProductsFlag = false;
    //     }
    // });

    $scope.confirmService = function(){

        console.log($scope.serviceSelection);

        for(var i = 0; i < $scope.products.length; i ++){
            var product = {
                'id': $scope.products[i].productNo.toString(),
                'price' : $scope.products[i].price.toString(),
                'pieces': "2",
                'quantity' : "1",
                'name' : $scope.products[i].productName
            };

            if($scope.serviceSelection.wash && product.id === '69'){
                $scope.request.products.push(product);
            }

            if($scope.serviceSelection.dry && product.id === '68'){
                $scope.request.products.push(product);
            }

            if($scope.serviceSelection.shirt.selected){
                if($scope.serviceSelection.shirt.press === "Laundry & Press" && product.id === '54'){
                    $scope.request.products.push(product);
                }
                if($scope.serviceSelection.shirt.press === 'Hand Press' && product.id === '55'){
                    $scope.request.products.push(product);
                }
                if($scope.serviceSelection.shirt.press ===  "Dry Clean" && product.id === '56'){
                    $scope.request.products.push(product);
                }
            }
            if($scope.serviceSelection.shoes && product.id === '70'){
                $scope.request.products.push(product);
            }
        }

        console.log($scope.request);

        convertToUnix($scope.request.pickup.date);
        $scope.serviceFocus = false;
        $scope.paymentFocus = true;
    };


    // PAYMENT


    $scope.newCard = false;
    $scope.savedCard = undefined;
    $scope.editCardFlag = false;
    $scope.editedCard = undefined;
    $scope.stripeInfo = {};

    $scope.selectNewCard = function(flag){
        $scope.newCard = flag;
        $scope.savedCard = undefined;
    };

    $scope.selectSavedCard = function(card){
        $scope.newCard = false;
        $scope.savedCard = card;
        console.log(card);
    };

    $scope.getStripeInfo = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/users/me/payment'
        };

        $http(req).then(function(res){
            $scope.stripeInfo = res.data;
            if($scope.stripeInfo.default_source){
                for(var i = 0; i < $scope.stripeInfo.sources.data.length; i++){
                    if($scope.stripeInfo.default_source === $scope.stripeInfo.sources.data[i].id){
                        $scope.newCard = false;
                        $scope.savedCard =$scope.stripeInfo.sources.data[i];
                    }
                }
            }
            console.log($scope.stripeInfo);
        });
    };

    $scope.getStripeInfo();

    $scope.showEditedCard = function(flag, card){
        $scope.editCardFlag = flag;

        $scope.editedCard = card;
        $scope.editedCard.goodThru = $scope.editedCard.exp_month + "/" + $scope.editedCard.exp_year%100;
        $scope.editedCard.formattedExpiry = $scope.editedCard.goodThru;

        // if($scope.editedCard === card){
        //     $scope.editedCard = undefined;
        //
        // }else{
        //     $scope.editedCard = card;
        //
        // }
    };

    $scope.$watch('paymentInfo.goodThru', function () {
        if($scope.paymentInfo.goodThru !== undefined){
            $scope.paymentInfo.formattedExpiry = $scope.paymentInfo.goodThru;
            if($scope.paymentInfo.goodThru.length === 2){
                $scope.paymentInfo.formattedExpiry = $scope.paymentInfo.formattedExpiry + '/'
            }
        }
    });

    $scope.$watch('editedCard.goodThru', function () {
        if($scope.editedCard !== undefined){
            $scope.editedCard.formattedExpiry = $scope.editedCard.goodThru;
            if($scope.editedCard.goodThru.length === 2){
                $scope.editedCard.formattedExpiry = $scope.editedCard.formattedExpiry + '/'
            }
        }
    });

    $scope.editCard = function(){
        if($scope.editedCard!== undefined){
            var card = $scope.editedCard;
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
                    $scope.editCardFlag = false;
                }
            });
        }

    };

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
            if(res.status){
                $scope.getStripeInfo();
                $scope.paymentInfo = {};
                $scope.newCard = false;
                $scope.getStripeInfo();
            }
        })
    };

    $scope.sendOrder = function (){
        console.log($scope.request);
        if($rootScope.userInfo.cleanCloudInfo === undefined){
            //adding new customer
            var req = {
                method: "POST",
                url: APP_CONFIG.cleanCloudUrl + 'addCustomer',
                headers: {
                    "Content-Type": "application/json"
                },
                data:{
                    'api_token': APP_CONFIG.cleanCloudAPIKey,
                    'customerName': $scope.userInfo.profile.firstName + " " + $scope.userInfo.profile.lastName,
                    'customerTel': $scope.userInfo.profile.phone,
                    'customerEmail': $scope.userInfo.profile.email,
                    'customerAddress': $scope.request.address.address + " " + $scope.request.address.city + " " + $scope.request.address.postal + " Unit:" + $scope.request.address.unit,
                    'customerNotes': "Buzzer: " + $scope.request.address.buzzer + ", Concierge: "+ $scope.request.address.conciergeReq
                                                + ", Concierge Accept: " + $scope.request.address.conciergeAccept + ", Customer Notes: " + $scope.request.address.notes
                }
            };

            $http(req).then(function(res){
                console.log(res);
                var req2 = {
                    method: "POST",
                    url: APP_CONFIG.apiUrl + "/users/me/cleanCloud/",
                    data: {
                        cleanCloudId : res.data.CustomerID,
                        lastAddress: $scope.request.address
                    }
                };

                $http(req2).then(function (res2) {
                    if(res2.status){
                        console.log(res);
                        $rootScope.userInfo.cleanCloudInfo = {
                            id : res.data.CustomerID,
                            lastAddress: $scope.request.address
                        };
                        $scope.sendOrder();
                    }
                })

            })
        }else{
            if(JSON.stringify($rootScope.userInfo.cleanCloudInfo.lastAddress) !== JSON.stringify($scope.request.address)){
                //change of address
                var updateReq = {
                    method: "POST",
                    url: APP_CONFIG.cleanCloudUrl + 'updateCustomer',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data:{
                        'api_token': APP_CONFIG.cleanCloudAPIKey,
                        'customerID': $scope.userInfo.cleanCloudInfo.id,
                        'customerName': $scope.userInfo.profile.firstName + " " + $scope.userInfo.profile.lastName,
                        'customerTel': $scope.userInfo.profile.phone,
                        'customerEmail': $scope.userInfo.profile.email,
                        'customerAddress': $scope.request.address.address + " " + $scope.request.address.city + " " + $scope.request.address.postal + " Unit:" + $scope.request.address.unit,
                        'customerNotes': "Buzzer: " + $scope.request.address.buzzer + ", Concierge: "+ $scope.request.address.conciergeReq
                        + ", Concierge Accept: " + $scope.request.address.conciergeAccept + ", Customer Notes: " + $scope.request.address.notes
                    }
                };

                $http(updateReq).then(function(res){
                    if(res.data.Success){
                        var updateReq2 = {
                            method: "POST",
                            url: APP_CONFIG.apiUrl + "/users/me/cleanCloud/",
                            data: {
                                cleanCloudId : $rootScope.userInfo.cleanCloudInfo.id,
                                lastAddress: $scope.request.address
                            }
                        };

                        $http(updateReq2).then(function (res) {
                            if(res.status){
                                console.log(res);
                                $rootScope.userInfo.cleanCloudInfo.lastAddress = angular.copy($scope.request.address);
                                $scope.sendOrder();
                            }
                        })
                    }
                });

            }else{
                console.log($scope.request);

                var req = {
                    method: "POST",
                    url: APP_CONFIG.cleanCloudUrl + 'addOrder',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data:{
                        'api_token': APP_CONFIG.cleanCloudAPIKey,
                        'customerID': $scope.userInfo.cleanCloudInfo.id,
                        'products': $scope.request.products,
                        // 'quantity': $scope.request.quantity,
                        'pickupDate': convertToUnix($scope.request.pickup.date).toString(),  //1527768000,//GMT time 12pm.
                        'pickupStart': $scope.request.pickup.start,
                        'pickupEnd':   $scope.request.pickup.end,
                        'delivery': '1',
                        'deliveryDate':  convertToUnix($scope.request.delivery.date).toString(), //1527768000,//
                        'deliveryStart': $scope.request.delivery.start,
                        'deliveryEnd': $scope.request.delivery.end,
                        'orderNotes': 'somenotes',
                        // 'priceListID': "",
                        "finalTotal": "0"

                    }
                };

                $http(req).then(function(res){
                    console.log(res.data);
                    if(res.data.orderID){
                        console.log(res.data.orderID);
                        addOrder(res.data.orderID);
                        addPromo($scope.usedPromo);
                    }
                })
            }
        }

    };

    function addOrder(orderId){
        console.log(orderId);
        var req = {
            method: "POST",
            url: APP_CONFIG.apiUrl + "/order/addOrder",
            data: {
                'userId':       $rootScope.userInfo._id,
                'cleanCloudID': $rootScope.userInfo.cleanCloudInfo.id,
                'orderId':      orderId,
                'orderInfo':   {
                    'products': $scope.request.products,
                    'pickupDate': $scope.request.pickup.date,  //1527768000,//GMT time 12pm.
                    'pickupStart': $scope.request.pickup.start,
                    'pickupEnd':   $scope.request.pickup.end,
                    'delivery': '1',
                    'deliveryDate':  $scope.request.delivery.date, //1527768000,//
                    'deliveryStart': $scope.request.delivery.start,
                    'deliveryEnd': $scope.request.delivery.end,
                    'orderNotes': $scope.request.productNotes,
                    'notifyMethod': '2',
                    'priceListID': "",
                    "finalTotal": "0",
                    'promoUsed': $scope.usedPromo,
                    'serviceType': $scope.addressType,
                    'cardLast4':  $scope.savedCard.last4
                },
                'orderStatus': 1
            }
        };

        $http(req).then(function (res) {
            console.log(res);
            if(res.data === "success"){
                //add current order to user
                var updateReq2 = {
                    method: "POST",
                    url: APP_CONFIG.apiUrl + "/users/me/cleanCloud/currentOrder",
                    data: {
                        currentOrder : {
                            'userId':       $rootScope.userInfo._id,
                            'cleanCloudID': $rootScope.userInfo.cleanCloudInfo.id,
                            'orderId':      orderId,
                            'orderInfo':   {
                                'products': $scope.request.products,
                                'pickupDate': $scope.request.pickup.date,  //1527768000,//GMT time 12pm.
                                'pickupStart': $scope.request.pickup.start,
                                'pickupEnd':   $scope.request.pickup.end,
                                'delivery': '1',
                                'deliveryDate':  $scope.request.delivery.date, //1527768000,//
                                'deliveryStart': $scope.request.delivery.start,
                                'deliveryEnd': $scope.request.delivery.end,
                                'orderNotes': $scope.request.productNotes,
                                'notifyMethod': '2',
                                //'priceListID': "",
                                "finalTotal": "0",
                                'promoUsed': $scope.usedPromo,
                                'serviceType': $scope.addressType,
                                'cardLast4':  $scope.savedCard.last4
                            },
                            'orderStatus': 1
                        }
                    }
                };

                $http(updateReq2).then(function (res) {
                    if(res.status){
                        $scope.orderComplete = true;
                    }
                })
            }
        })
    }

    $scope.promoCode = "";
    $scope.promoMsg = {
        status: null,
        msg: ""
    };

    $scope.usedPromo = null;

    function addPromo(promo){
        if(promo !== null){
            var req = {
                method: 'POST',
                url: APP_CONFIG.apiUrl + "/promotion/saveCode",
                data:{
                    code: promo.code
                }
            };

            $http(req).then(function (res) {
                console.log(res);
            })
        }
    }

    $scope.applyPromo = function(code){
        var date = new Date();
        // console.log(date);
        var req = {
            method: 'POST',
            url: APP_CONFIG.apiUrl + "/promotion/applyCode",
            data:{
                code: code,
                date: date.getFullYear()+'.'+ (date.getMonth()+1) +'.'+date.getUTCDate()
            }
        };
        console.log(req);

        $http(req).then(function (res) {
            console.log(res);
            if(res.data.status){
                $scope.usedPromo = res.data.promo;
                $scope.promoMsg.status = res.data.status;
                $scope.promoMsg.msg = res.data.message + ' '+  res.data.promo.discountType + res.data.promo.amount +' off!' + ' (Min Order: $'+ res.data.promo.minOrder+ ')';
            }else if(res.data.error){
                $scope.promoMsg.status = res.data.status;
                $scope.promoMsg.msg = res.data.message;
            }
        })
    };


    function convertToUnix(date){
        return (new Date(date).getTime() / 1000 + 28800);
    }

});