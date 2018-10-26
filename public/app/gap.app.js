var gap = angular.module ($appId, $dependencies);
gap.constant('APP_CONFIG', window.appConfig);

gap.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/');
});

gap.run(function($rootScope, $transitions, $http, APP_CONFIG, $state){
    $transitions.onFinish({}, function(transition){
        var stateName = String(transition.to().name);
        if(stateName.includes('home.products.')){
            $('html, body').animate({ scrollTop: 100 }, 'slow');
        }else{
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        }
        // if(stateName === 'home.products'){
        //     $('html, body').animate({ scrollTop: 0 }, 'slow');
        // }
        // if(stateName === 'home.about'){
        //     $('html, body').animate({ scrollTop: 0 }, 'slow');
        // }

    });

});
