var mrbaffo = angular.module ($appId, $dependencies);
mrbaffo.constant('APP_CONFIG', window.appConfig);

mrbaffo.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');

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
                    templateUrl: 'components/home/home.html'
                },
                "contentHome@home":{
                    templateUrl: 'components/home/landing/landing.html'
                }
            }
        })

        .state('home.about',{
            url: 'about',
            views: {
                "contentHome@home":{
                    templateUrl: 'components/home/about/about.html',
                }
            }
        })

        .state('home.pricing',{
            url: 'pricing',
            views: {
                "contentHome@home":{
                    templateUrl: 'components/home/pricing/pricing.html',
                }
            }
        })

        .state('home.corporate',{
            url: 'corporate',
            views: {
                "contentHome@home":{
                    templateUrl: 'components/home/corporate/corporate.html',
                }
            }
        })

        .state('home.faq',{
            url: 'faq',
            views: {
                "contentHome@home":{
                    templateUrl: 'components/home/faq/faq.html',
                }
            }
        });

    // $locationProvider.html5Mode(true);
});
//
mrbaffo.run(function($rootScope, $transitions, $http, APP_CONFIG, $state){
    console.log('hello');
    $rootScope.loggedIn = undefined;
    $rootScope.currentState = undefined;
    $rootScope.userId = undefined;
    $rootScope.userInfo = undefined;

    $transitions.onStart({}, function(transition) {
        var req = {
            method: 'GET',
            url: APP_CONFIG.apiUrl + '/loggedIn'
        };

        $http(req).then(function(res) {
            console.log(res);
            $rootScope.loggedIn = res.data.loggedIn;

            if($rootScope.loggedIn){
                $rootScope.userId = res.data.user._id;
                $rootScope.userInfo = res.data.user;
            }

            if(transition.to().name.split('.')[0] === 'user' && !$rootScope.loggedIn){
                $state.transitionTo('home');
            }

            if(transition.to().name === 'home.login' && $rootScope.loggedIn){
                $state.transitionTo('home');
            }

            if(transition.to().name === 'home.register' && $rootScope.loggedIn){
                $state.transitionTo('home');
            }

            if(transition.to().name.split('.')[0] === 'user' && $rootScope.loggedIn ){
                $rootScope.verification = res.data.user.profile.verification.verified;
                if(!$rootScope.verification){
                    $state.transitionTo('user.verify');
                }
            }
        });

        $rootScope.currentState = transition.to().name.split('.')[0];

        console.log($rootScope.currentState);

        console.log(
            "Successful Transition from " + transition.from().name +
            " to " + transition.to().name
        );
    });

    $rootScope.apiUrl = "http://localhost:8080";

    // $rootScope.login = function (user){
    //     var req = {
    //         method: 'POST',
    //         url: APP_CONFIG.apiUrl + '/login',
    //         data: user
    //     };
    //     console.log(req);
    //
    //     $http(req).then(function(res){
    //         console.log(res);
    //         $rootScope.loggedIn = res.data.loggedIn;
    //         $rootScope.userId = res.data.user._id;
    //         $rootScope.userInfo = res.data.user;
    //
    //         if(res.data.user.profile.verification.verified === false){
    //             $state.transitionTo('user.verify');
    //         }else {
    //             $state.transitionTo('user');
    //         }
    //     });
    // };

    $rootScope.logout = function (){
        var req = {
            method: 'GET',
            url: APP_CONFIG.apiUrl + '/logout'
        };

        $http(req).then(function(res) {
            console.log(res);
            $rootScope.loggedIn = res.data;
            $rootScope.userId = null;
            $rootScope.userInfo = null;

            $state.transitionTo('home');
        })
    };

    console.log('hello');
});
