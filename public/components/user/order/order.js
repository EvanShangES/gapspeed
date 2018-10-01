angular.module('mrbaffo.user.order', ['ui.router']).config(function($stateProvider){
    $stateProvider
        .state('user.order',{
            url: '/order',
            views: {
                "contentUser@user":{
                    templateUrl: 'components/user/order/order.html',
                    controller : 'orderController'
                }
            }
        })
        .state('user.order.new',{
            url: '/new',
            params: {
                orderBox: null
            },
            views: {
                "contentUser@user":{
                    templateUrl: 'components/user/order/newOrder/newOrder.html',
                    controller : 'newOrderController'
                }
            }
        })
        .state('user.order.edit', {
            url: '/editOrder/:orderBox/:orderId',
            params: {
                orderBox: null,
                orderId: null
            },
            views: {
                "contentUser@user":{
                    templateUrl: 'components/user/order/editOrder/editOrder.html',
                    controller : 'editOrderController'
                }
            }
        });
});

bulkLoad([
    'components/user/order/newOrder/newOrderService.js',
    'components/user/order/editOrder/editOrderService.js'
]);