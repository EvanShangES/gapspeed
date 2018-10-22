angular.module('mrbaffo.user.order').controller('orderController', function($scope, $rootScope, $http, APP_CONFIG, $state, $compile) {

    $scope.newOrder = function(type){
        console.log(type);
        $state.go('user.order.new', {orderBox: type});
    };

    $scope.loadAreaTypes = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + "/serviceAreaTypes"
        };

        $http(req).then(function (res) {
            console.log(res);
            $scope.areaTypes = res.data;
        })
    };

    $scope.editOrder = function(){
        $state.go('user.order.edit', {orderBox: $scope.currentOrder.orderInfo.serviceType, orderId: $scope.currentOrder.orderId});
    };

    $scope.currentOrder = null;

    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    $scope.loadCurrentOrder = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/users/me'
        };

        $http(req).then(function(res){
            console.log(res);
            if(res.data.cleanCloudInfo.currentOrder !== null) {
                $scope.currentOrder = res.data.cleanCloudInfo.currentOrder;
                console.log($scope.currentOrder);
                if ($scope.currentOrder.orderStatus === 1) {
                    $scope.currentMessage = "Your order will be picked up on " + new Date($scope.currentOrder.orderInfo.pickupDate).getDate() + " "
                        + mL[new Date($scope.currentOrder.orderInfo.pickupDate).getUTCMonth()] + " before " + $scope.currentOrder.orderInfo.pickupEnd
                        + " from your " + $scope.currentOrder.orderInfo.serviceType + ". (Order #" + $scope.currentOrder.orderId + ")";

                    console.log($scope.currentMessage);
                }
            }

            var d = new Date(); // for now
            console.log(d.getHours()); // => 9
            console.log(d.getMinutes()); // =>  30
            console.log(d.getSeconds()); // => 51
        });
    };

    $scope.noNewOrder = function(){
        console.log('no new order');
        $('#noNewOrder').modal({backdrop: 'static', keyboard: false});
    };

    $scope.cancelFlag = false;

    $scope.cancelOrderModal = function(){
        $('#cancelOrderModal').modal({backdrop: 'static', keyboard: false});
    };

    $scope.cancelCurrentOrder = function(){
        var req = {
            method: "POST",
            url: APP_CONFIG.cleanCloudUrl + 'updateOrder',
            headers: {
                "Content-Type": "application/json"
            },
            data:{
                'api_token': APP_CONFIG.cleanCloudAPIKey,
                'orderID': $scope.currentOrder.orderId,
                'pickupDate': convertToUnix('1999.1.1').toString(),  //1527768000,//GMT time 12pm.
                'deliveryDate':  convertToUnix('1999.1.1').toString() //1527768000,//
            }
        };

        $http(req).then(function(res){
            console.log(res.data);
            if(res.data.Success){
                $scope.cancelFlag = true;
            }
        })
    };

    $scope.completeCancel = function(){
        var updateReq2 = {
            method: "POST",
            url: APP_CONFIG.apiUrl + "/users/me/cleanCloud/currentOrder",
            data: {
                currentOrder : null
            }
        };

        $http(updateReq2).then(function (res) {
            if(res.status){
                $('#cancelOrderModal').modal('hide');
                location.reload();
            }
        })
    };

    $scope.loadAreaTypes();
    $scope.loadCurrentOrder();

    function convertToUnix(date){
        return (new Date(date).getTime() / 1000 + 28800);
    }
});