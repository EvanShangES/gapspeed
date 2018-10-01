angular.module('mrbaffo.forgotpass').controller('forgotpassController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q){
    $scope.resetFlag = false;

    var token = window.location.href.split('token=')[1];
    if(token !== undefined){
        console.log(token);
        $scope.resetFlag = true;
    }

    $scope.resetEmail = null;

    $scope.reset = {
        password: null,
        confirmPassword: null
    };

    $scope.sendResetEmail = function(email){
        var req = {
            method: 'GET',
            url: APP_CONFIG.apiUrl + '/forgotPass/'+ email
        };
        console.log(req);

        $http(req).then(function(res){
            console.log(res);
            // if(res.data.status === 200){
            //
            //     $state.transitionTo('user');
            // }else if(res.data.status === 401){
            //     $scope.errorMsg = res.data.error;
            //     $scope.loginForm.email.$setValidity('valid', false)
            // }else if(res.data.status === 402){
            //     $scope.errorMsg = res.data.error;
            //     $scope.loginForm.password.$setValidity('valid', false)
            // }
        })
    };

    var pattern = {
        charLength: function() {
            if($scope.reset.password.length >= 8 ) {
                return true;
            }
        },
        lowercase: function() {
            var regex = /^(?=.*[a-z]).+$/;

            if( regex.test($scope.reset.password) ) {
                return true;
            }
        },
        uppercase: function() {
            var regex = /^(?=.*[A-Z]).+$/;

            if( regex.test($scope.reset.password) ) {
                return true;
            }
        },
        special: function() {
            var regex = /^(?=.*[0-9_\W]).+$/;

            if( regex.test($scope.reset.password) ) {
                return true;
            }
        }
    };

    $scope.$watch('reset.password', function(){
        var charLen = pattern.charLength();
        var lowercase = pattern.lowercase();
        var uppercase = pattern.uppercase();
        var special = pattern.special();

        if(charLen && lowercase && uppercase && special){
            $scope.resetForm.password.$setValidity("valid", true);
        }else{
            $scope.resetForm.password.$setValidity("valid", false);
        }
    });

    $scope.$watch('reset.confirmPassword', function(){
        if($scope.reset.password != null && $scope.reset.password !== ""){
            if($scope.reset.password === $scope.reset.confirmPassword){
                $scope.resetForm.confirmPassword.$setValidity("valid", true);
            }else{
                $scope.resetForm.confirmPassword.$setValidity("valid", false);
            }
        }
    });

    $scope.resetSuccess = false;
    $scope.resetPass = function(reset){
        console.log(reset);
        var req = {
            method: 'PUT',
            url: APP_CONFIG.apiUrl + '/forgotPass/reset',
            data:{
                newPassword: reset.password,
                token: token
            }
        };
        console.log(req);
        $http(req).then(function(res){
            console.log(res);
            if(res.data.status){
                $scope.resetSuccess = res.data.status;
            }
            // if(res.data.status === 200){
            //
            //     $state.transitionTo('user');
            // }else if(res.data.status === 401){
            //     $scope.errorMsg = res.data.error;
            //     $scope.loginForm.email.$setValidity('valid', false)
            // }else if(res.data.status === 402){
            //     $scope.errorMsg = res.data.error;
            //     $scope.loginForm.password.$setValidity('valid', false)
            // }
        })
    };

    console.log(window.location.href);
    console.log(document.URL);

    // var url_string = "http://www.example.com/?a=1&b=3&c=m2-m3-m4-m5"; //window.location.href
    // var url = new URL(url_string);
    // var c = url.searchParams.get("c");
    // console.log(c);

});
