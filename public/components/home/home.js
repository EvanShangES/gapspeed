angular.module('gap.home', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    navbar: {
                        templateUrl: 'components/nav/homeNav.html'
                    },
                    footer:{
                        templateUrl: 'components/nav/footer.html'
                    },
                    root: {
                        templateUrl: 'components/index.html'
                    },
                    "contentHome@home":{
                        templateUrl: 'components/home/home.html'
                    }
                }
            })
    });