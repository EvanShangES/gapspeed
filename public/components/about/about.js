angular.module('gap.about', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('home.about',{
                url: 'about',
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/about/about.html'
                        // controller : 'aboutController'
                    }
                }
            });
    });