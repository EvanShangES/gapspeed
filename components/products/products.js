angular.module('gap.products', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('home.products',{
                url: 'products',
                views: {
                    "contentHome@home":{
                        templateUrl: 'components/products/products.html',
                        controller : 'productsController'
                    },
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/product_index.html'
                    }
                }
            })
            .state('home.products.flexPipes', {
                url: '/flex-pipes',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/flexPipes/flexPipes.html',
                        controller: 'flexPipeController'
                    }
                }
            })
            .state('home.products.catConverters', {
                url: '/cat-converters',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/catalyticConverters/catalyticConverters.html',
                        controller: 'catalyticConverterController'
                    }
                }
            })
            .state('home.products.hangersInsulators', {
                url: '/hangers-insulators',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/hangersInsulators/hangersInsulators.html',
                        controller: 'hangersInsulatorsController'
                    }
                }
            })
            .state('home.products.exhaustClamps', {
                url: '/exhaust-clamps',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/exhaustClamps/exhaustClamps.html',
                        controller: 'exhaustClampsController'
                    }
                }
            });
    });

bulkLoad([
    'components/products/flexPipes/flexPipeService.js',
    'components/products/catalyticConverters/catalyticConverterService.js',
    'components/products/hangersInsulators/hangersInsulatorService.js',
    'components/products/exhaustClamps/exhaustClampService.js'
]);