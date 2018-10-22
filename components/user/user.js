angular.module('mrbaffo.user', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('user', {
                url: '/profile',
                views: {
                    navbar: {
                        templateUrl: 'components/nav/userNav.html'
                    },
                    footer:{
                        templateUrl: 'components/nav/footer.html'
                    },
                    root: {
                        templateUrl: 'components/user/userHome.html',
                        controller: 'userHomeController'
                    },
                    "contentUser@user":{
                        templateUrl: 'components/user/order/order.html',
                        controller : 'orderController'
                    }
                }
            });

        $urlRouterProvider.otherwise('/home');
    });