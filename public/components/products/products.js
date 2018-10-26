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
            })
            .state('home.products.mufflers-universal', {
                url: '/mufflers/universal-aluminized',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/mufflers/universal/mufflers_universal.html',
                        controller: 'mufflersController'
                    }
                }
            })
            .state('home.products.mufflers-performance', {
                url: '/mufflers/high-performance',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/mufflers/high_performance/mufflers_performance.html',
                        controller: 'mufflersController'
                    }
                }
            })
            .state('home.products.mufflers-truck', {
                url: '/mufflers/truck-mufflers',
                views:{
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/mufflers/truck/mufflers_truck.html',
                        controller: 'mufflersController'
                    }
                }
            })
            .state('home.products.mufflers-tractor', {
                url: '/mufflers/tractor-mufflers',
                views: {
                    "contentProducts@home.products": {
                        templateUrl: 'components/products/mufflers/tractor/mufflers_tractor.html',
                        controller: 'mufflersController'
                    }
                }
            })
            .state('home.products.mufflers-stainless', {
                url: '/mufflers/stainless-steel',
                views: {
                    "contentProducts@home.products": {
                        templateUrl: 'components/products/mufflers/stainless_steel/mufflers_stainless.html',
                        controller: 'mufflersController'
                    }
                }
            })
            .state('home.products.exhausts-specialized',{
                url: '/exhausts/specialized-tips',
                views: {
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/exhaustTips/specialized/exhaust_specialized.html',
                        controller: 'exhaustController'
                    }
                }
            })
            .state('home.products.exhausts-stainless',{
                url: '/exhausts/stainless-steel',
                views: {
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/exhaustTips/stainless_steel/exhaust_stainless.html',
                        controller: 'exhaustController'
                    }
                }
            })
            .state('home.products.other-parts',{
                url: '/other-parts',
                views: {
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/others/other_parts/other_parts.html',
                        controller: 'otherPartController'
                    }
                }
            })
            .state('home.products.astros',{
                url: '/other-parts/astros',
                views: {
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/others/astros/astros_parts.html',
                        controller: 'otherPartController'
                    }
                }
            })
            .state('home.products.accessories',{
                url: '/accessories',
                views: {
                    "contentProducts@home.products":{
                        templateUrl: 'components/products/accessories/accessories.html',
                        controller: 'accessoriesController'
                    }
                }
            });
    });

bulkLoad([
    'components/products/flexPipes/flexPipeService.js',
    'components/products/catalyticConverters/catalyticConverterService.js',
    'components/products/hangersInsulators/hangersInsulatorService.js',
    'components/products/exhaustClamps/exhaustClampService.js',
    'components/products/mufflers/mufflerService.js',
    'components/products/exhaustTips/exhaustService.js',
    'components/products/others/otherPartService.js',
    'components/products/accessories/accessoriesService.js'
]);