angular.module('mrbaffo.user.admin', ['ui.router']).config(function($stateProvider){
    // console.log('loaded');
    $stateProvider
        .state('user.admin',{
            url: '/admin',
            views: {
                "contentUser@user":{
                    templateUrl: 'components/user/admin/admin.html',
                    controller : 'adminController'
                },
                "adminProducts@user.admin":{
                    templateUrl: 'components/user/admin/products/product.html',
                    controller : 'productController'
                },
                "adminServiceAreas@user.admin":{
                    templateUrl: 'components/user/admin/serviceAreas/serviceArea.html',
                    controller : 'serviceAreaController'
                },
                "adminPromotions@user.admin":{
                    templateUrl: 'components/user/admin/promotions/promotion.html',
                    controller : 'promotionController'
                },
                "adminReferrals@user.admin":{
                    templateUrl: 'components/user/admin/referrals/referral.html',
                    controller : 'adminReferralController'
                }
            }
        })
});

bulkLoad([
    'components/user/admin/products/productService.js',
    'components/user/admin/serviceAreas/serviceAreaService.js',
    'components/user/admin/promotions/promotionService.js',
    'components/user/admin/referrals/referralService.js'
]);