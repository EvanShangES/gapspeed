angular.module('mrbaffo.user.referral', ['ui.router']).config(function($stateProvider){
    // console.log('loaded');
    $stateProvider
        .state('user.referral',{
            url: '/referral',
            views: {
                "contentUser@user":{
                    templateUrl: 'components/user/referral/referral.html',
                    controller : 'referralController'
                }
            }
        });
});