angular.module('gap.products').controller('exhaustClampsController', function($scope, $rootScope, $stateParams, $http){
    $scope.exhaustClampData = [];

    var req = {
        method: "GET",
        url: 'components/products/exhaustClamps/exhaust_clamps.json'
    };

    $http(req).then(function(res){
        console.log(res);
        $scope.exhaustClampData = res.data;
    });

    $scope.tableData = null;

    // $scope.showDetails = function(data){
    //     console.log(data);
    //     $scope.tableData = data;
    //     $('#modalDetails').modal();
    //     // $scope.$apply(function(){
    //     //     $scope.tableData = data;
    //     // })
    // }
});