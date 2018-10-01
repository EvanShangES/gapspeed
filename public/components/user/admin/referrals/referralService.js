angular.module('mrbaffo.user.admin').controller('adminReferralController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q) {

    $scope.referAmounts = {

    };

    $scope.editReferralFlag = false;

    $scope.saveReferral = function(){
        var req = {
            method: "POST",
            url: APP_CONFIG.apiUrl + "/admin/referral",
            data: $scope.referAmounts
        };

        $http(req).then(function (res) {
            console.log(res);
            if(res.data.status){

            }
        })
    };

    $scope.editReferral = function(){
        var req = {
            method: "PUT",
            url: APP_CONFIG.apiUrl + "/admin/referral/" + $scope.referAmounts._id,
            data: $scope.referAmounts
        };

        $http(req).then(function (res) {
            console.log(res);
            if(res.data.status){

            }
        })
    };

    $scope.loadReferralInfo = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/referralInfo'
        };

        $http(req).then(function(res){
            console.log(res.data);
            if(res.data.status){
                if(res.data.referralInfo.length !== 0){
                    console.log('yrs');
                    $scope.referAmounts = res.data.referralInfo[0];
                    $scope.editReferralFlag = true;
                }
            }
        });
    };

    $scope.loadReferralInfo();
});