angular.module('mrbaffo.user.verify').controller('verifyController', function($scope, APP_CONFIG, $http, $state, $rootScope){
    $scope.$watch('verificationCode', function(){
        $scope.verifyForm.verificationCode.$setValidity('incorrect', true);
    });

    $scope.verify = function(code){
        var req = {
            method: 'PUT',
            url: APP_CONFIG.apiUrl + '/verify/' + code.toString()
        };

        $http(req).then(function(res) {
            if(res.data.verified){
                $state.transitionTo('user');
            }else{
                $scope.verifyForm.verificationCode.$setValidity('incorrect', false)
            }
        });
    };

    $scope.resend = function(){
        var req = {
            method: 'GET',
            url: APP_CONFIG.apiUrl + '/verify/resend'
        };

        $http(req).then(function(res) {
            //a new code as been sent
            console.log(res);
        });
    }
});