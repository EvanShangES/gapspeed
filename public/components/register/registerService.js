angular.module('mrbaffo.register').controller('registerController', function(APP_CONFIG, $scope, $rootScope, $state, $stateParams, $http){

    $scope.init = {
        firstName: null,
        lastName: null,
        phone: null,
        email: null,
        password: null,
        confirmPassword: null,
        referral: null
    };

    //to mask phone number
    document.getElementById('initPhone').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    $('[data-toggle="tooltip"]').tooltip();

    $scope.duplicateEmail = null;
    $scope.validEmail = null;
    $scope.$watch('init.email', function(){
        if($scope.init.email != null && $scope.init.email !== "") {
            if (validateEmail($scope.init.email)) {
                var req = {
                    method: 'GET',
                    url: APP_CONFIG.apiUrl + '/email/' + $scope.init.email
                };
                $http(req).then(function(res) {
                    console.log(res.data);
                    $scope.duplicateEmail = res.data;
                    $scope.validEmail = !res.data;

                    $scope.signupForm.email.$setValidity("duplicate", !$scope.duplicateEmail);
                    $scope.signupForm.email.$setValidity("valid", $scope.validEmail);
                });
            }else{
                $scope.validEmail = false;
                $scope.signupForm.email.$setValidity("valid", $scope.validEmail);
            }
        }else{
            $scope.duplicateEmail = false;
            $scope.validEmail = false;
            $scope.signupForm.email.$setValidity("duplicate", true);
            $scope.signupForm.email.$setValidity("valid", false);
        }
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    var pattern = {
        charLength: function() {
            if($scope.init.password.length >= 8 ) {
                return true;
            }
        },
        lowercase: function() {
            var regex = /^(?=.*[a-z]).+$/;

            if( regex.test($scope.init.password) ) {
                return true;
            }
        },
        uppercase: function() {
            var regex = /^(?=.*[A-Z]).+$/;

            if( regex.test($scope.init.password) ) {
                return true;
            }
        },
        special: function() {
            var regex = /^(?=.*[0-9_\W]).+$/;

            if( regex.test($scope.init.password) ) {
                return true;
            }
        }
    };

    $scope.$watch('init.password', function(){
        var charLen = pattern.charLength();
        var lowercase = pattern.lowercase();
        var uppercase = pattern.uppercase();
        var special = pattern.special();

        if(charLen && lowercase && uppercase && special){
            $scope.signupForm.password.$setValidity("valid", true);
        }else{
            $scope.signupForm.password.$setValidity("valid", false);
        }
    });

    $scope.$watch('init.confirmPassword', function(){
        if($scope.init.password != null && $scope.init.password !== ""){
            if($scope.init.password === $scope.init.confirmPassword){
                $scope.signupForm.confirmPassword.$setValidity("valid", true);
            }else{
                $scope.signupForm.confirmPassword.$setValidity("valid", false);
            }
        }
    });


    $scope.register = function(newUser){
        var req = {
            method: 'POST',
            url: APP_CONFIG.apiUrl + '/register',
            data: newUser
        };

        $http(req).then(function(res){
            $state.transitionTo('user');
        })
    };
});

// angular.module('registerService', []).factory('Nerd', ['$http', function($http) {
//
//     return {
//         // call to get all nerds
//         get : function() {
//             return $http.get('/api/nerds');
//         },
//
//         // these will work when more API routes are defined on the Node side of things
//         // call to POST and create a new nerd
//         create : function(nerdData) {
//             return $http.post('/api/nerds', nerdData);
//         },
//
//         // call to DELETE a nerd
//         delete : function(id) {
//             return $http.delete('/api/nerds/' + id);
//         }
//     }
//
// }]);