angular.module('gap.products', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('home.products',{
                url: 'products',
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/products/products.html'
                        // controller : 'aboutController'
                    }
                }
            });
    });