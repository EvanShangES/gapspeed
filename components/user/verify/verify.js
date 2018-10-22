angular.module('mrbaffo.user.verify', ['ui.router']).config(function($stateProvider){
    // console.log('loaded');
    $stateProvider
        .state('user.verify',{
            url: '/verify',
            views: {
                "contentUser@user":{
                    templateUrl: 'components/user/verify/verify.html',
                    controller : 'verifyController'
                }
            }
        });
});