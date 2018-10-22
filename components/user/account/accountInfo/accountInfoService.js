angular.module('mrbaffo.user.account').controller('accountInfoController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q) {
    $scope.userInfo = undefined;
    $scope.profile = undefined;

    var req = {
        method: "GET",
        url: APP_CONFIG.apiUrl + '/users/me'
    };

    $http(req).then(function(res){
        $scope.userInfo = res.data;
        $scope.profile = res.data.profile;
        console.log($scope.userInfo);
    });

    $scope.accountProfileEdit = false;
    $scope.accountPasswordEdit = false;

    $scope.duplicateEmail = null;
    $scope.validEmail = null;
    $scope.$watch('profile.email', function(){
        if($scope.profile !== undefined){
            if($scope.profile.email != null && $scope.profile.email !== "") {
                if (validateEmail($scope.profile.email)) {
                    var req = {
                        method: 'GET',
                        url: APP_CONFIG.apiUrl + '/email/' + $scope.profile.email
                    };
                    $http(req).then(function(res) {
                        console.log(res.data);
                        $scope.duplicateEmail = res.data;
                        $scope.validEmail = !res.data;

                        $scope.profileForm.email.$setValidity("duplicate", !$scope.duplicateEmail);
                        $scope.profileForm.email.$setValidity("valid", $scope.validEmail);
                    });
                }else{
                    $scope.validEmail = false;
                    $scope.profileForm.email.$setValidity("valid", $scope.validEmail);
                }
            }else{
                $scope.duplicateEmail = false;
                $scope.validEmail = false;
                $scope.profileForm.email.$setValidity("duplicate", true);
                $scope.profileForm.email.$setValidity("valid", false);
            }
        }
    });

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $scope.editAccount = function(type){
        if(type === 'profile'){
            $scope.accountProfileEdit = !$scope.accountProfileEdit;
        }else if (type === 'password'){
            $scope.accountPasswordEdit = !$scope.accountPasswordEdit;
        }
    };

    $('[data-toggle="tooltip"]').tooltip();

    $scope.password ={
        current: null,
        new: null,
        newConfirm: null
    };

    var pattern = {
        charLength: function() {
            if($scope.password.new.length >= 8 ) {
                return true;
            }
        },
        lowercase: function() {
            var regex = /^(?=.*[a-z]).+$/;

            if( regex.test($scope.password.new) ) {
                return true;
            }
        },
        uppercase: function() {
            var regex = /^(?=.*[A-Z]).+$/;

            if( regex.test($scope.password.new) ) {
                return true;
            }
        },
        special: function() {
            var regex = /^(?=.*[0-9_\W]).+$/;

            if( regex.test($scope.password.new) ) {
                return true;
            }
        }
    };

    $scope.$watch('password.new', function(){
        if($scope.password.new !== null){
            var charLen = pattern.charLength();
            var lowercase = pattern.lowercase();
            var uppercase = pattern.uppercase();
            var special = pattern.special();

            if(charLen && lowercase && uppercase && special){
                $scope.passwordForm.newPassword.$setValidity("valid", true);
            }else{
                $scope.passwordForm.newPassword.$setValidity("valid", false);
            }
        }
    });

    $scope.$watch('password.newConfirm', function(){
        if($scope.password.newConfirm !== null){
            if($scope.password.new != null && $scope.password.new !== ""){
                if($scope.password.new === $scope.password.newConfirm){
                    $scope.passwordForm.newPasswordConfirm.$setValidity("valid", true);
                }else{
                    $scope.passwordForm.newPasswordConfirm.$setValidity("valid", false);
                }
            }
        }
    });

    $scope.$watch('password.current', function(){
        $scope.passwordForm.currentPassword.$setValidity("valid", true);
    });


    $scope.updateProfile = function(profile, password){
        if($scope.accountProfileEdit){
            console.log('profile');
            var req = {
                method: 'PUT',
                url: APP_CONFIG.apiUrl + '/users/me/profile/' + $scope.userInfo._id,
                data: profile
            };

            $http(req).then(function(res){
                console.log(res);
                $scope.accountProfileEdit = false;
            });
        }

        if($scope.accountPasswordEdit){
            var req = {
                method: 'PUT',
                url: APP_CONFIG.apiUrl + '/users/me/password/' + $scope.userInfo._id,
                data: {
                    currentPassword: password.current,
                    newPassword: password.new
                }
            };

            $http(req).then(function(res){
                console.log(res);
                if(res.data.status){
                    $scope.accountPasswordEdit = false;
                    $scope.password ={
                        current: null,
                        new: null,
                        newConfirm: null
                    };
                }else{
                    $scope.passwordForm.currentPassword.$setValidity("valid", false);
                    $scope.passwordErrorMessage = res.data.message;
                }
            });
        }
    };



    // ADDRESS
    $scope.addressEdit = {
        home: false,
        office: false,
        other: false
    };
    // $scope.userInfo = $rootScope.userInfo;
    // console.log($rootScope.userInfo);

    $scope.editAddress = function(type, flag){
        console.log(type, flag);

        $scope.addressEdit[type] = flag;

        console.log($scope.addressEdit);
    };

    function saveAddress (type, address){
        var req = {
            method: 'PUT',
            url: APP_CONFIG.apiUrl + '/address/' + $scope.userInfo._id + '/' + type,
            data: address
        };

        $http(req).then(function(res){
            console.log(res);

            document.getElementById(type +"Address").style.borderColor = "green";
            document.getElementById(type +"Unit").style.borderColor = "green";
            document.getElementById(type +"Buzzer").style.borderColor = "green";
            document.getElementById(type +"City").style.borderColor = "green";
            document.getElementById(type +"Postal").style.borderColor = "green";

            $scope.addressEdit[type] = false;
        });
    }

    $scope.updateAddress = function (type, address){
        console.log(type);
        console.log(address);

        var req = {
            method: 'GET',
            url: APP_CONFIG.apiUrl + '/addressCheck/' + address.address +'/' + address.postal
        };

        console.log(req.url);

        $http(req).then(function(res){
            if(res.data.success){
                saveAddress(type, address);
            } else{
                console.log('not saved');
                document.getElementById(type +"Address").style.borderColor = "red";
                document.getElementById(type +"Unit").style.borderColor = "red";
                document.getElementById(type +"Buzzer").style.borderColor = "red";
                document.getElementById(type +"City").style.borderColor = "red";
                document.getElementById(type +"Postal").style.borderColor = "red";
            }
        });
    };
});
