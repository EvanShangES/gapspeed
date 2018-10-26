angular.module('gap.products').controller('exhaustController', function($scope, $rootScope, $state, $stateParams, $http, $transitions){

    $scope.exhausts_specializedData = [];
    $scope.exhausts_stainlessData = [[],[],[],[],[],[]];

    if($state.$current.name === 'home.products.exhausts-specialized'){
        var req = {
            method: "GET",
            url: 'components/products/exhaustTips/specialized/exhaust_tips_specialized.json'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.exhausts_specializedData = res.data;
        });
    }

    $scope.stainlessIndex = 0;
    if($state.$current.name === 'home.products.exhausts-stainless'){
        var req = {
            method: "GET",
            url: 'components/products/exhaustTips/stainless_steel/exhaust_tips_stainless.json'
        };

        $http(req).then(function(res){
            console.log(res);
            var index = 0;

            for(var i  = 0 ; i < res.data.length; i ++){
                if($scope.exhausts_stainlessData[index].length === 9){
                    index++
                }
                $scope.exhausts_stainlessData[index].push(res.data[i])
            }
            console.log($scope.exhausts_stainlessData);
        });

        $scope.stainlessGoPage = function(pageNum){
            $scope.stainlessIndex = pageNum;
            $('html, body').animate({ scrollTop: 400 }, 'slow');
        };

        $scope.stainlessNextPrevPage = function(pagination){
            if($scope.stainlessIndex + pagination >= 0 && $scope.stainlessIndex + pagination <= $scope.exhausts_stainlessData.length){
                $scope.stainlessIndex = $scope.stainlessIndex + pagination;
                $('html, body').animate({ scrollTop: 400 }, 'slow');
            }
        };
    }

    $scope.tableData = null;

    $scope.showDetails = function(data){
        $scope.tableData = data;
        $('#modalDetails').modal();
    }
});