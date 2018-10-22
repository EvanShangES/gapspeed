angular.module('gap.about').controller('aboutController', function(APP_CONFIG, $scope, $rootScope, $state, $stateParams, $http){

    // console.log($stateParams);
    //
    // $scope.userLogin = {
    //     email: $stateParams.email,
    //     password: ""
    // };
    //
    // $scope.errorMsg = "";
    //
    // $scope.$watch('userLogin.email', function(){
    //     $scope.loginForm.email.$setValidity('valid', true);
    // });
    //
    // $scope.$watch('userLogin.password', function(){
    //     $scope.loginForm.password.$setValidity('valid', true)
    // });
    //
    // $scope.login = function (user){
    //     var req = {
    //         method: 'POST',
    //         url: APP_CONFIG.apiUrl + '/login',
    //         data: user
    //     };
    //     console.log(req);
    //
    //     $http(req).then(function(res){
    //         console.log(res);
    //         if(res.data.status === 200){
    //
    //             $state.transitionTo('user');
    //         }else if(res.data.status === 401){
    //             $scope.errorMsg = res.data.error;
    //             $scope.loginForm.email.$setValidity('valid', false)
    //         }else if(res.data.status === 402){
    //             $scope.errorMsg = res.data.error;
    //             $scope.loginForm.password.$setValidity('valid', false)
    //         }
    //     })
    //
    // };

});