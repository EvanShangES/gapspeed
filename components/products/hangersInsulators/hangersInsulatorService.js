angular.module('gap.products').controller('hangersInsulatorsController', function($scope, $rootScope, $stateParams, $http){
    $scope.hangersInsulatorData = [];

    var req = {
        method: "GET",
        url: 'components/products/hangersInsulators/hangers_insulators.json'
    };

    $http(req).then(function(res){
        console.log(res);
        $scope.hangersInsulatorData = res.data;
    });

    $scope.tableData = null;

    $scope.showDetails = function(data){
        console.log(data);
        $scope.tableData = data;
        $('#modalDetails').modal();
        // $scope.$apply(function(){
        //     $scope.tableData = data;
        // })
    }
});