angular.module('mrbaffo.login', ['ui.router'])
    .config(function($stateProvider){
        console.log('loaded');
        $stateProvider
            .state('home.login',{
                url: 'login',
                params: {
                    email: ""
                },
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/login/login.html',
                        controller : 'loginController'
                    }
                }
            })
    });
