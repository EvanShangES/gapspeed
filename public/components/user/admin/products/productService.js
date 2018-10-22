angular.module('mrbaffo.user.admin').controller('productController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q) {

    $scope.loadProducts = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/products'
        };

        $http(req).then(function(res){
            console.log(res);
            $scope.products = res.data;
            refreshTable();
        });
    };

    function refreshTable() {
        table.clear().draw();
        table.rows.add($scope.products); // Add new data
        table.columns.adjust().draw(); // Redraw the DataTable

        $('.dt-edit').on('click', function(){
            var data = table.row( $(this).parents('tr') ).data();
            console.log(data);

            $scope.editProduct(data);
        });

        $('.dt-delete').on('click', function(){
            var data = table.row( $(this).parents('tr') ).data();
            console.log(data);

            $scope.deleteProduct(data._id);
        });
    }

    var table; // use a global for the submit and return data rendering in the examples

    $(document).ready(function() {
        $scope.loadProducts();

        table = $('#example').DataTable( {
            "lengthChange": false,
            "searching": false,
            "pageLength": 10,
            "pagingTyper": "simple_numbers",
            "data": $scope.products,
            "columns": [
                // { "data": "_id"},
                { "data": "productNo","width": "5%" },
                { "data": "productName"},
                { "data": "selectionName" },
                { "data": "price" },
                { "data": ""}
            ],
            "columnDefs": [ {
                "targets": -1,
                "data": null,
                "defaultContent": "<button class='btn-sm btn-primary dt-edit'>Edit</button> <button class='btn-sm btn-primary dt-delete'>Delete</button>"
            } ],
            // "dom": '<"pull-left"f><"pull-right"l>t<"pull-left"i><"pull-right"p><"clear">',
            // "initComplete": function() {
            //     $('#loadingGif').fadeOut(function(){
            //         $('#subjectList').fadeIn();
            //     });
            // }
        });

        // $('.dt-edit').on('click', function(){
        //     var data = table.row( $(this).parents('tr') ).data();
        //     console.log(data);
        //
        //     $scope.editProduct(data);
        // });
        //
        // $('.dt-delete').on('click', function(){
        //     var data = table.row( $(this).parents('tr') ).data();
        //     console.log(data);
        //
        //     $scope.deleteProduct(data);
        // });

    } );

    $scope.product = {
        productNo : "",
        productName: "",
        selectionName:"",
        price: ""
    };

    $('#newProductModal').on('hide.bs.modal', function () {
        $scope.product = {
            productNo : "",
            productName: "",
            selectionName:"",
            price: ""
        };
    });

    $scope.newProductFlag = false;

    $scope.closeModal = function(){
        $scope.newProductFlag = false;

        $('#newProductModal').modal('hide');

        $scope.product = {
            productNo : '',
            productName: "",
            selectionName:"",
            price: ""
        };
    };

    $scope.newProduct = function (){
        $scope.newProductFlag = true;
        $('#newProductModal').modal({backdrop: 'static', keyboard: false});
    };

    $scope.editProduct = function (data) {
        $('#newProductModal').modal({backdrop: 'static', keyboard: false});
        $scope.$apply(function(){
            $scope.product = data;
        })
    };

    $scope.deleteProduct = function (id) {
        var req = {
            method: "Delete",
            url: APP_CONFIG.apiUrl + "/admin/products/" + id,
        };

        $http(req).then(function (res) {
            console.log(res);
            if(res.data === "success"){
                $scope.loadProducts();
            }
        })
    };

    $scope.saveProduct = function (product, type){
        if(type === 'new') {
            var req = {
                method: "POST",
                url: APP_CONFIG.apiUrl + "/admin/products/",
                data: product
            };

            $http(req).then(function (res) {
                console.log(res);
                if(res.data === "success"){
                    $('#newProductModal').modal('hide');
                    $scope.loadProducts();

                    $scope.product = {
                        productNo : '',
                        productName: "",
                        selectionName:"",
                        price: ""
                    };
                }
            })
        }else if(type === 'edit'){
            var req = {
                method: "PUT",
                url: APP_CONFIG.apiUrl + "/admin/products/" + $scope.product._id,
                data: product
            };

            $http(req).then(function (res) {
                if(res.data.status){
                    $('#newProductModal').modal('hide');
                    $scope.loadProducts();

                    $scope.product = {
                        productNo : '',
                        productName: "",
                        selectionName:"",
                        price: ""
                    };
                }
            })
        }

    };


});
