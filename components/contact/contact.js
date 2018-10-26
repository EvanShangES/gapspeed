angular.module('gap.contact', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('home.contact',{
                url: 'contact',
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/contact/contact.html',
                        controller : 'contactController'
                    }
                }
            });
    });