angular.module('gap.products').controller('otherPartController', function($scope, $rootScope, $state, $stateParams, $http){
    $scope.otherPartsData = [];
    $scope.astrosPartsData = [];

    if($state.$current.name === 'home.products.other-parts'){
        var req = {
            method: "GET",
            url: 'components/products/others/other_parts/other_parts.json'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.otherPartsData = res.data;
        });
    }

    if($state.$current.name === 'home.products.astros'){
        var req = {
            method: "GET",
            url: 'components/products/others/astros/astros_parts.json'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.astrosPartsData = res.data;
        });
    }
    //
    // var req = {
    //     method: "GET",
    //     url: 'components/products/hangersInsulators/hangers_insulators.json'
    // };
    //
    // $http(req).then(function(res){
    //     console.log(res);
    //     $scope.hangersInsulatorData = res.data;
    // });
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