angular.module('gap.products').controller('flexPipeController', function($scope, $rootScope, $stateParams, $http){
    $scope.flexPipeData = [];

    var req = {
        method: "GET",
        url: 'components/products/flexPipes/flexPipes.json'
    };

    $http(req).then(function(res){
        console.log(res);
        $scope.flexPipeData = res.data;
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