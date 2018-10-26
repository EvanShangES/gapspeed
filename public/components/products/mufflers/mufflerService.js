angular.module('gap.products').controller('mufflersController', function($scope, $rootScope, $state, $stateParams, $http, $transitions){

    $scope.mufflers_peformanceData = [];
    $scope.mufflers_truckData = [];
    $scope.mufflers_tractorData = [];
    $scope.mufflers_stainlessData = [[], [], [], []];
    $scope.mufflers_universalData = [[], [], []];

    console.log($state.$current.name);

    if($state.$current.name === 'home.products.mufflers-performance'){
        var req = {
            method: "GET",
            url: 'components/products/mufflers/high_performance/mufflers_performance.json'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.mufflers_peformanceData = res.data;
        });
    }
    if($state.$current.name === 'home.products.mufflers-truck'){
        var req = {
            method: "GET",
            url: 'components/products/mufflers/truck/mufflers_truck.json'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.mufflers_truckData = res.data;
        });
    }
    if($state.$current.name === 'home.products.mufflers-tractor'){
        var req = {
            method: "GET",
            url: 'components/products/mufflers/tractor/mufflers_tractor.json'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.mufflers_tractorData = res.data;
        });
    }

    $scope.stainlessIndex = 0;
    if($state.$current.name === 'home.products.mufflers-stainless'){
        var req = {
            method: "GET",
            url: 'components/products/mufflers/stainless_steel/mufflers_stainless.json'
        };

        $http(req).then(function(res){
            console.log(res);
            var index = 0;

            for(var i  = 0 ; i < res.data.length; i ++){
                if($scope.mufflers_stainlessData[index].length === 9){
                    index++
                }
                $scope.mufflers_stainlessData[index].push(res.data[i])
            }
            console.log($scope.mufflers_stainlessData);
        });

        $scope.stainlessGoPage = function(pageNum){
            $scope.stainlessIndex = pageNum;
            $('html, body').animate({ scrollTop: 400 }, 'slow');
        };

        $scope.stainlessNextPrevPage = function(pagination){
            if($scope.stainlessIndex + pagination >= 0 && $scope.stainlessIndex + pagination <= $scope.mufflers_stainlessData.length){
                $scope.stainlessIndex = $scope.stainlessIndex + pagination;
                $('html, body').animate({ scrollTop: 400 }, 'slow');
            }
        };
    }

    $scope.universalIndex = 0;
    if($state.$current.name === 'home.products.mufflers-universal'){
        var req = {
            method: "GET",
            url: 'components/products/mufflers/universal/mufflers_universal.json'
        };

        $http(req).then(function(res){
            console.log(res);
            var index = 0;

            for(var i  = 0 ; i < res.data.length; i ++){
                if($scope.mufflers_universalData[index].length === 9){
                    index++
                }
                $scope.mufflers_universalData[index].push(res.data[i])
            }
            console.log($scope.mufflers_universalData)
        });

        $scope.uniGoPage = function(pageNum){
            $scope.universalIndex = pageNum;
            $('html, body').animate({ scrollTop: 400 }, 'slow');
        };

        $scope.uniNextPrevPage = function(pagination){
            if($scope.universalIndex + pagination >= 0 && $scope.universalIndex + pagination <= $scope.mufflers_universalData.length){
                $scope.universalIndex = $scope.universalIndex + pagination;
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