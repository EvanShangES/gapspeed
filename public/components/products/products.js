angular.module('gap.products', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('home.products',{
                url: 'products',
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/products/products.html'
                        // controller : 'aboutController'
                    },
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/product_index.html'
                    }
                }
            })
            .state('home.products.flexibleTube', {
                url: 'products/flexible-tubes',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/flexibleTubes/flexibleTubes.html'
                    }
                }
            });
    });