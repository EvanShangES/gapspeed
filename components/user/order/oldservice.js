angular.module('mrbaffo.user.order').controller('orderController', function($scope, $rootScope, $http, APP_CONFIG){
    //jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function(){
        if(animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)-3).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50)+"%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale('+scale+')',
                    'position': 'absolute'
                });
                next_fs.css({'left': left, 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".previous").click(function(){
        if(animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)-3).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({opacity: 0}, {
            step: function(now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1-now) * 50)+"%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({'left': left});
                previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
            },
            duration: 800,
            complete: function(){
                // current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".submit").click(function(){
        return false;
    });

    $('.menuTab').click(function(){
        $(".menuTab-current").removeClass('menuTab-current');
        $menuTab = $(this);
        if(!$menuTab.hasClass('menuTab-current')){
            $menuTab.addClass('menuTab-current');
        }
    });

    $(function () {
        $('#datetimepicker1').datetimepicker();
    });

    $(function () {
        $('#datetimepicker2').datetimepicker();
    });

    var req = {
        method: "GET",
        url: APP_CONFIG.apiUrl + '/users/me'
    };

    $http(req).then(function(res){
        $scope.userInfo = res.data;
        console.log($scope.userInfo);
    });



    $scope.request = {
        address: {},
        pickup: undefined,
        delivery: undefined,
        products: undefined,
        quantity: undefined,
        payment: {}
    };

    $scope.addressSelected = false;

    $scope.selectAddress = function(type){
        $scope.addressSelected = true;
        $scope.request.address = $scope.userInfo.addressInfo[type];
    };


    $scope.confirmAddress = function(address){
        var req = {
            method: 'GET',
            url: APP_CONFIG.apiUrl + '/addressCheck/' + address.address +'/' + address.postal
        };

        // console.log(req.url);

        $http(req).then(function(res){
            console.log(res);
            if(res.data.success){
                // saveAddress(type, address);
                $scope.request.pickup = res.data.area.pickup;
                $scope.request.delivery = res.data.area.delivery;
            }
        });
    };

    // $scope.$watch('request.address.postal', function(){
    //
    //     if($scope.request.address.postal !== undefined){
    //         var req = {
    //             method: "GET",
    //             url: APP_CONFIG.apiUrl + '/postalCheck/'+ $scope.request.address.postal.substring(0, 3)
    //         };
    //
    //         $http(req).then(function(res){
    //             console.log(res);
    //             $scope.request.pickup = res.data.pickup;
    //             $scope.request.delivery = res.data.delivery;
    //         });
    //     }
    //
    //     console.log($scope.request.address.postal);
    // });

    $scope.selectItems = function (){
        console.log($scope.request);
    };

    $scope.requestSelection = {
        washFold: false,
        shirtClean: {
            press: ""
        },
        dryClean: false,
        notes: ""
    };

    $scope.selectWashFold = function(){
        if($scope.requestSelection.washFold){
            $scope.requestSelection.washFold = false
        }else{
            $scope.requestSelection.washFold = true;
        }

    };

    $scope.selectShirtClean = function(){
        if($scope.requestSelection.shirtClean.flag){
            $scope.requestSelection.shirtClean.flag = false
        }else{
            $scope.requestSelection.shirtClean.flag = true;
        }
    };

    $scope.selectDryClean = function(){
        if($scope.requestSelection.dryClean){
            $scope.requestSelection.dryClean = false
        }else{
            $scope.requestSelection.dryClean = true;
        }
    };

    $scope.goToPayment = function(){
        $scope.request.products = [];
        $scope.request.quantity = [];

        if($scope.requestSelection.washFold){
            $scope.request.products.push('Wash & Fold');
            $scope.request.quantity.push(1);
        }
        if($scope.requestSelection.shirtClean.press !== "" && $scope.requestSelection.shirtClean.flag){
            $scope.request.products.push($scope.requestSelection.shirtClean.press);
            $scope.request.quantity.push(1);
        }
        if($scope.requestSelection.dryClean){
            $scope.request.products.push('Dry Cleaning');
            $scope.request.quantity.push(1);
        }
        console.log($scope.request);
    };

    function convertToUnix(date){
        return (new Date(date).getTime() / 1000);
    }

    function newCleanCloudUser(){

    }

    // function

    $scope.sendOrder = function (){
        console.log($scope.request);

        if(!$scope.userInfo.cleanCloudInfo){
            var req = {
                method: "POST",
                url: APP_CONFIG.cleanCloudUrl + 'addCustomer',
                headers: {
                    "Content-Type": "application/json",
                },
                data:{
                    'api_token': APP_CONFIG.cleanCloudAPIKey,
                    'customerName': $scope.userInfo.profile.firstName + " " + $scope.userInfo.profile.lastName,
                    'customerTel': $scope.userInfo.profile.phone,
                    'customerEmail': $scope.userInfo.profile.email,
                    'customerAddress': $scope.request.address.address + " " + $scope.request.address.city + " " + $scope.request.address.postal + " Unit:" + $scope.request.address.unit,
                    'customerNotes': "Buzzer: " + $scope.request.address.buzzer
                }
            };

            $http(req).then(function(res){
                console.log(res);
                var req2 = {
                    method: "POST",
                    url: APP_CONFIG.apiUrl + "/users/me/cleanCloud/",
                    data: {
                        cleanCloudId : res.data.CustomerID
                    }
                };

                $http(req2).then(function (res2) {
                    console.log(res2);
                })

            })
        }else{
            var req = {
                method: "POST",
                url: APP_CONFIG.cleanCloudUrl + 'addOrder',
                headers: {
                    "Content-Type": "application/json"
                },
                // data:{
                //     'api_token': APP_CONFIG.cleanCloudAPIKey,
                //     'customerID': $scope.userInfo.cleanCloudInfo.id,
                //     'products': $scope.request.products,
                //     'quantity': $scope.request.quantity,
                //     'pickupDate': 1505736000,//convertToUnix($scope.request.pickup.date).toString(),
                //     'pickupStart': $scope.request.pickup.start,
                //     'pickupEnd':  $scope.request.pickup.end,
                //     'delivery': '1',
                //     'deliveryDate': 1506686400,// convertToUnix($scope.request.delivery.date).toString(),
                //     'deliveryStart': $scope.request.delivery.start,
                //     'deliveryEnd': $scope.request.delivery.end,
                //     'orderNotes': 'notes for the order',
                //     'notifyMethod': '2',
                //     'priceListID': "",
                //     "finalTotal": "0"
                // },
                data:{
                    'api_token': APP_CONFIG.cleanCloudAPIKey,
                    'customerID': $scope.userInfo.cleanCloudInfo.id,
                    'products': $scope.request.products,
                    'quantity': $scope.request.quantity,
                    'pickupDate': convertToUnix($scope.request.pickup.date).toString(),  //1527768000,//GMT time 12pm.
                    'pickupStart': "10am", //$scope.request.pickup.start,
                    'pickupEnd':  "11am", //$scope.request.pickup.end,
                    'delivery': '1',
                    'deliveryDate':  convertToUnix($scope.request.delivery.date).toString(), //1527768000,//
                    'deliveryStart': "1pm", //$scope.request.delivery.start,
                    'deliveryEnd': "2pm", //$scope.request.delivery.end,
                    'orderNotes': 'notes for the order',
                    'notifyMethod': '2',
                    'priceListID': "",
                    "finalTotal": "0"
                }
            };

            console.log(req);

            $http(req).then(function(res){
                console.log(res);
                // var req2 = {
                //     method: "POST",
                //     url: APP_CONFIG.apiUrl + "/users/me/cleanCloud/",
                //     data: {
                //         cleanCloudId : res.data.CustomerID
                //     }
                // };
                //
                // $http(req2).then(function (res2) {
                //     console.log(res2);
                // })

            })
        }


    }


});