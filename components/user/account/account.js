angular.module('mrbaffo.user.account', ['ui.router']).config(function($stateProvider){
    // console.log('loaded');
    $stateProvider
        .state('user.account',{
            url: '/account',
            views: {
                "contentUser@user":{
                    templateUrl: 'components/user/account/account.html',
                    controller : 'accountController'
                },
                "accountInfo@user.account":{
                    templateUrl: 'components/user/account/accountInfo/accountInfo.html',
                    controller : 'accountInfoController'
                },
                "accountPayment@user.account":{
                    templateUrl: 'components/user/account/payment/payment.html',
                    controller : 'paymentController'
                },
                "accountOrderHistory@user.account":{
                    templateUrl: 'components/user/account/orderHistory/orderHistory.html',
                    controller : 'orderHistoryController'
                }
            }
        });
});

bulkLoad([
    'components/user/account/accountInfo/accountInfoService.js',
    'components/user/account/payment/paymentService.js',
    'components/user/account/orderHistory/orderHistoryService.js'
]);