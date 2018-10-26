angular.module('gap.products').controller('accessoriesController', function($scope, $rootScope, $state, $stateParams, $http){
    $scope.accessoriesData = [];

    var req = {
        method: "GET",
        url: 'components/products/accessories/accessories.json'
    };

    $http(req).then(function(res){
        console.log(res);
        $scope.accessoriesData = res.data;
    });
    //
    // $scope.tableData = null;
    //
    // $scope.showDetails = function(data){
    //     console.log(data);
    //     $scope.tableData = data;
    //     $('#modalDetails').modal();
    //     // $scope.$apply(function(){
    //     //     $scope.tableData = data;
    //     // })
    // }
});