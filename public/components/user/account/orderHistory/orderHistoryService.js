angular.module('mrbaffo.user.account').controller('orderHistoryController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q) {
    $scope.sendOrder = function(){
        var req = {
            method: "POST",
            url: APP_CONFIG.apiUrl + '/updateOrder',
            data: {
                'api_token': 'MrbaffoAPItoken$123',
                'customerID': '38',
                'orderID': '230',
                'orderStatus': 1, //not sure what you guys send for status codes
                'products': [{
                    'id': '56',
                    'price': '5',
                    'pieces': "2",
                    'quantity': "7",
                    'name': 'Shirt (Dry Clean)'
                },
                    {
                        'id': '68',
                        'price': '5',
                        'pieces': "1",
                        'quantity': "3",
                        'name': 'Dry Cleaning'
                    }],
                'finalTotal': '53.50',
                'pickupDate': '2018.07.18',  //1527768000,//GMT time 12pm.
                'pickupStart': "6:00pm",
                'pickupEnd': "7:00pm",
                'deliveryDate': '2018.07.21',
                'deliveryStart': "3:00pm",
                'deliveryEnd': "5:00pm",
                'orderNotes': 'notes for the order',
                'notifyMethod': '2'
            }
        };

        $http(req).then(function(res) {
            console.log(res);
        })
    };

    $scope.updateTookan = function(){
        var req = {
            method: "POST",
            url: APP_CONFIG.apiUrl + '/updateOrder/tookan',
            data: {
                tookan_shared_secret: 'Xbte4e2AwYsBmbht',
                job_status: 2,
                job_state: "Successful",
                order_id: '230'
            }
        };

        $http(req).then(function(res) {
            console.log(res);
        })
    };

    $scope.getAreas = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/admin/serviceArea/Home',
        };

        $http(req).then(function(res) {
            console.log(res);
        })
    };

    $scope.userInfo = null;
    $scope.currentOrder = null;
    $scope.orderHistory = null;


    var req = {
        method: "GET",
        url: APP_CONFIG.apiUrl + '/users/me'
    };

    $http(req).then(function(res){
        $scope.userInfo = res.data;
        $scope.currentOrder= res.data.cleanCloudInfo.currentOrder;
        console.log($scope.userInfo);
        $scope.getOrderHistory();

    });


    $scope.getOrderHistory = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/users/me/orderHistory/' + $scope.userInfo._id
        };

        $http(req).then(function(res){
            console.log(res);
            // $scope.userInfo = res.data;
            $scope.orderHistory= res.data.orderHistory;
            // console.log($scope.userInfo);
        });
    };


});
