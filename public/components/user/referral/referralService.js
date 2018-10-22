angular.module('mrbaffo.user.referral').controller('referralController', function($scope, APP_CONFIG, $http){
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

});