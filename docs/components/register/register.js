angular.module('mrbaffo.register', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('home.register',{
                url: 'register',
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/register/register.html',
                        controller : 'registerController'
                    }
                }
            });
    });