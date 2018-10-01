angular.module('mrbaffo.user.admin').controller('promotionController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q) {
    $(function () {
        $('#validFrom').datetimepicker({
            format: 'YYYY.MM.DD'
        });
        $('#validTo').datetimepicker({
            format: 'YYYY.MM.DD'
        });
    });

    $scope.promo = {
        promoId: "",
        code: "",
        name: "",
        usageNumber: "",
        discountType: "",
        amount: "",
        valid:{
            from: "",
            to:""
        },
        minOrder:""
    };

    function refreshPromoTable (){
        promoTable.clear().draw();
        promoTable.rows.add($scope.promotions); // Add new data
        promoTable.columns.adjust().draw(); // Redraw the DataTable

        $('.promo-edit').on('click', function(){
            var data = promoTable.row( $(this).parents('tr') ).data();
            console.log(data);

            $scope.editPromotions(data);
        });

        $('.promo-delete').on('click', function(){
            var data = promoTable.row( $(this).parents('tr') ).data();
            console.log(data);

            $scope.deletePromotions(data._id);
        });
    }

    $scope.loadPromotions = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/promotion'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.promotions = res.data;
            refreshPromoTable();
        });
    };

    var promoTable;

    $(document).ready(function() {
        $scope.loadPromotions();

        promoTable = $('#promoTable').DataTable( {
            "lengthChange": false,
            "searching": false,
            "pageLength": 10,
            "pagingTyper": "simple_numbers",
            "data": $scope.promotions,
            "columns": [
                { "data": "promoId","width": "5%" },
                { "data": "name"},
                { "data": "code" },
                { "data": "discountType" },
                { "data": "amount"},
                { "data": "usageNumber"},
                { "data": "minOrder"},
                { "data": "valid.from"},
                { "data": "valid.to"},
                { "data": ""}

            ],
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": "<button class='btn-sm btn-primary promo-edit'>Edit</button> <button class='btn-sm btn-primary promo-delete'>Delete</button>"
            } ],
            // "dom": '<"pull-left"f><"pull-right"l>t<"pull-left"i><"pull-right"p><"clear">',
            // "initComplete": function() {
            //     $('#loadingGif').fadeOut(function(){
            //         $('#subjectList').fadeIn();
            //     });
            // }
        });

        $('.promo-edit').on('click', function(){
            var data = table.row( $(this).parents('tr') ).data();
            console.log(data);

            $scope.editProduct(data);
        });

        $('.promo-delete').on('click', function(){
            var data = table.row( $(this).parents('tr') ).data();
            console.log(data);

            $scope.deleteProduct(data);
        });

    } );

    $scope.newPromoFlag = false;

    $scope.closeModal = function(){
        $scope.newPromoFlag = false;

        $('#newPromotionModal').modal('hide');

        $scope.promo = {
            promoId: "",
            code: "",
            name: "",
            usageNumber: "",
            discountType: "",
            amount: "",
            valid:{
                from: "",
                to:""
            },
            minOrder:""
        };
    };

    $scope.newPromotion = function (){
        $scope.newPromoFlag = true;
        $('#newPromotionModal').modal({backdrop: 'static', keyboard: false});
    };

    $scope.editPromotions = function(data){
        console.log(data);
        $('#newPromotionModal').modal({backdrop: 'static', keyboard: false});
        $scope.$apply(function(){
            $scope.promo = data;
        })
    };

    $scope.deletePromotions = function(id){
        var req = {
            method: "Delete",
            url: APP_CONFIG.apiUrl + "/admin/promotions/" + id,
        };

        $http(req).then(function (res) {
            console.log(res);
            if(res.data.status){
                $scope.loadPromotions();
            }
        })
    };

    $scope.savePromotion = function(promo, type){
        if(type === 'new') {
            $scope.promo.valid.from = $("#validFrom").val();
            $scope.promo.valid.to = $("#validTo").val();
            $scope.promo.discountType = promo.discountType.split(' ')[0];
            var req = {
                method: "POST",
                url: APP_CONFIG.apiUrl + "/admin/promotion/",
                data: $scope.promo
            };

            $http(req).then(function (res) {
                console.log(res);
                if(res.data.status){
                    $('#newPromotionModal').modal('hide');
                    $scope.promo = {
                        couponId: "",
                        code: "",
                        name: "",
                        usageNumber: "",
                        discountType: "",
                        amount: "",
                        valid:{
                            from: "",
                            to:""
                        },
                        minOrder:""
                    };
                }
            })
        }else if (type === 'edit'){
            console.log(promo);

            var req = {
                method: "PUT",
                url: APP_CONFIG.apiUrl + "/admin/promotion/"+ $scope.promo._id,
                data: $scope.promo
            };

            $http(req).then(function (res) {
                console.log(res);
                if(res.data.status){
                    $('#newPromotionModal').modal('hide');
                    $scope.promo = {
                        couponId: "",
                        code: "",
                        name: "",
                        usageNumber: "",
                        discountType: "",
                        amount: "",
                        valid:{
                            from: "",
                            to:""
                        },
                        minOrder:""
                    };
                }
            })
        }

        $scope.loadPromotions();

    };


});