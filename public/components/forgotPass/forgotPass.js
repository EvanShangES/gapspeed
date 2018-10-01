angular.module('mrbaffo.forgotpass', ['ui.router'])
    .config(function($stateProvider){
        console.log('loaded');
        $stateProvider
            .state('home.forgot',{
                url: 'forgotpassword',
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/forgotpass/forgotpass.html',
                        controller : 'forgotpassController'
                    }
                }
            });
    });