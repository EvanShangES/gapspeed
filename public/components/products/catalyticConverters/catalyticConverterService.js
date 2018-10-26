angular.module('gap.products').controller('catalyticConverterController', function($scope, $rootScope, $stateParams, $http){
    $scope.catConverterData = [];

    var req = {
        method: "GET",
        url: 'components/products/catalyticConverters/catalytic_converters.json'
    };

    $http(req).then(function(res){
        console.log(res);
        $scope.catConverterData = res.data;
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