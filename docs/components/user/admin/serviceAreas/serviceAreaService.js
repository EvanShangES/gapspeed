angular.module('mrbaffo.user.admin').controller('serviceAreaController', function($scope, $rootScope, $http, APP_CONFIG, $stateParams, $q) {
    $scope.newAreaType = false;
    $scope.deleteAreaType = {
        flag:   false,
        areaType: undefined
    };
    $scope.editAreaType = {
        flag:   false,
        areaType: undefined
    };

    $scope.areaTypes = {};

    $scope.showEditAreaType = function(flag, areaType){
        $scope.editAreaType = {
            flag:   flag,
            areaType: areaType
        };
    };

    $scope.showDeleteAreaType = function(flag, areaType){
        $scope.deleteAreaType = {
            flag:   flag,
            areaType: areaType
        };
    };

    $scope.updateAreaType = function(areaType){
        var req = {
            method: "PUT",
            url: APP_CONFIG.apiUrl + "/admin/serviceAreaType/" + areaType._id,
            data: areaType
        };

        $http(req).then(function (res) {
            console.log(res);

            if(res.data.status){
                $scope.loadAreaTypes();
                // $scope.newAreaType = false;
                // addAreaTypeBox(areaType);
            }
        })
    };

    $scope.removeAreaType = function(areaType){
        var req = {
            method: "DELETE",
            url: APP_CONFIG.apiUrl + "/admin/serviceAreaType/" + areaType._id
        };

        $http(req).then(function (res) {
            console.log(res);

            if(res.data.status){
                $scope.deleteAreaType = {
                    flag:   false,
                    areaType: undefined
                };
                $scope.loadAreaTypes();

            }
        })
    };

    $scope.createAreaType = function (flag) {
        $scope.newAreaType = flag;
        // addAreaTypeBox();
    };

    $scope.saveAreaType = function(areaType){
        console.log(areaType);
        if(areaType.name !== undefined && areaType.notes !== undefined){
            var req = {
                method: "POST",
                url: APP_CONFIG.apiUrl + "/admin/serviceAreaType",
                data: areaType
            };

            $http(req).then(function (res) {
                console.log(res);

                if(res.data.status){
                    $scope.newAreaType = false;
                    $scope.loadAreaTypes();
                }
            })
        }
    };

    $scope.loadAreaTypes = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + "/serviceAreaTypes"
        };

        $http(req).then(function (res) {
            console.log(res);
            $scope.areaTypes = res.data;

            // addAreaTypeBox(res.data);
        })
    };

    $scope.loadAreaTypes();



    ////////////////////////
    $scope.selectedAreaType = null;

    $scope.selectAreaType = function (areaType) {
        $scope.selectedAreaType = areaType;

        $scope.loadAreaByType(areaType);
        console.log($scope.selectedAreaType);

    };

    $scope.loadAreaByType = function(type){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/admin/serviceArea/' + type.name
        };

        $http(req).then(function(res){
            if(res.data.status){
                $scope.areas = res.data.areas;
                console.log($scope.areas);
                initMap(res.data.areas, false);
            }
            // if(res.status){
            //     $scope.areas = res.data;
            //     initMap(res.data);
            // }
            console.log(res.data);
            // refreshAreaTable();
        });
    };

    $scope.loadArea = function(){
        var req = {
            method: "GET",
            url: APP_CONFIG.apiUrl + '/serviceArea'
        };

        $http(req).then(function(res){
            $scope.areas = res.data;
            console.log(res.data);
            initMap(res.data, false);
        });
    };

    $scope.serviceArea = {
        name: "",
        areaType: "",
        areaCoords: undefined,
        conciergeReq: false,
        serviceTime:{
            pickup: {},
            delivery: {},
            notes: ""
        },
        otherServiceTime:{
            pickup: {},
            delivery: {},
            notes: ""
        }
    };

    $scope.editServiceAreaFlag = false;
    $scope.newServiceAreaFlag = false;
    $scope.serviceAreaFormFlag = false;

    var newAreaPolygon;
    $scope.createNewServiceArea = function(flag){
        $scope.newServiceAreaFlag = flag;
        initMap($scope.areas, flag);
    };

    $scope.deleteServiceAreaFlag = false;
    $scope.deleteServiceArea = function(serviceArea, flag){

    };

    var rectangle;
    var polygon;
    $scope.editPolygon = null;
    var map;
    var infoWindow;
    var polys;

    initMap([], false);

    var areaPolys = [];

    function initMap(areaTypes, newArea, editAreaId) {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 43.66359, lng: -79.38188},
            zoom: 14
        });

        var bounds = {
            north: 43.67303,
            south: 43.6599,
            east: -79.3691,
            west: -79.3916
        };

        var coords = [
            {lat: 43.67303, lng: -79.3916},
            {lat: 43.67303, lng: -79.3691},
            {lat: 43.6599, lng: -79.3691},
            {lat: 43.6599, lng: -79.3916}
        ];

        for(var i = 0; i < areaTypes.length; i++){
            var areaCoords = [];
            console.log(i);
            for(var l = 0; l < areaTypes[i].areaCoords.length; l++){
                areaCoords.push({
                    lat: areaTypes[i].areaCoords[l][0],
                    lng: areaTypes[i].areaCoords[l][1]
                });

                if(l === areaTypes[i].areaCoords.length-1){
                    if(editAreaId === areaTypes[i]._id){
                        $scope.$apply(function () {
                            $scope.editPolygon = new google.maps.Polygon({
                                paths: areaCoords,
                                draggable: true,
                                editable: true,
                                geodesic: false,
                                data: areaTypes[i]
                            });

                            $scope.editAreaId = editAreaId;
                            $scope.editServiceAreaFlag = true;

                            $scope.editPolygon.setMap(map);
                            $scope.serviceArea = areaTypes[i];
                            console.log($scope.serviceArea);
                        });
                    }else{
                        var poly = new google.maps.Polygon({
                            paths: areaCoords,
                            draggable: false,
                            editable: false,
                            geodesic: false,
                            clickable: true,
                            data: areaTypes[i]
                        });

                        poly.setMap(map);
                        poly.addListener('click', showNewRect);

                        areaPolys.push(poly);
                    }
                    // console.log(poly)


                    // console.log(areaPoly);

                }
            }
        }

        if(newArea){
            newAreaPolygon = new google.maps.Polygon({
                clickable: true,
                paths: coords,
                draggable: true,
                editable: true,

                geodesic: false
            });

            newAreaPolygon.setMap(map);
        }

        infoWindow = new google.maps.InfoWindow();
    }
    // Show the new coordinates for the rectangle in an info window.

    /** @this {google.maps.Rectangle} */

    function showNewRect(event) {
        console.log(event);
        console.log(this);
        // console.log(polygon);
        var bounds = new google.maps.LatLngBounds();
        var polygonCoords = this.getPath().getArray();
        //
        for (var i = 0; i < polygonCoords.length; i++) {
            bounds.extend(polygonCoords[i]);
        }

        var point = bounds.getCenter();


        // console.log(polygon.getPath().getArray());
        // console.log(polygon);

        // var ne = rectangle.getBounds().getNorthEast();
        // console.log(ne);
        // var sw = rectangle.getBounds().getSouthWest();
        //
        var contentString =
            '<div id="info'+this.data._id+'">' +
                '<h4><small style="font-weight: 600">'+this.data.name+'</small></h4>' +
                '<span style="font-size: 18px; font-weight: 400">Concierge Service: ('+this.data.serviceTime.delivery.date+')</span><br>' +
                '<p style="font-size: 15px">Pick up from <span style="font-weight: 600">'+this.data.serviceTime.pickup.start+'</span> to <span style="font-weight: 600">'+ this.data.serviceTime.pickup.end+'</span><br>' +
                'Delivery from <span style="font-weight: 600">'+this.data.serviceTime.delivery.start+'</span> to <span style="font-weight: 600">'+ this.data.serviceTime.delivery.end+'</span></p><br>' +
                '<span style="font-size: 18px; font-weight: 400">No Concierge Service: ('+this.data.otherServiceTime.delivery.date+')</span>' +
                '<p style="font-size: 15px; font-weight: 400">Pick up from <span style="font-weight: 600">'+this.data.otherServiceTime.pickup.start+'</span> to <span style="font-weight: 600">'+ this.data.otherServiceTime.pickup.end+'</span><br>' +
                'Delivery from <span style="font-weight: 600">'+this.data.otherServiceTime.delivery.start+'</span> to <span style="font-weight: 600">'+ this.data.otherServiceTime.delivery.end+'</span></p><br>' +

                '<button type="button" id="editInfo" value="'+this.data._id+'" class="Rectangle-9-Copy-3">Edit</button> ' +
                '<button type="button" id="deleteInfo" value="'+this.data._id+'/'+this.data.name+'" class="Rectangle-9-Copy-3 ">Delete</button>'+
            '</div>';

        infoWindow.setContent(contentString);
        infoWindow.setPosition(point);

        infoWindow.open(map);
    }

    $('#map').on('click', '#editInfo', function(){
        $scope.editServiceArea(this.value, true);
    });

    $('#map').on('click', '#deleteInfo', function(){
        $scope.deleteServiceArea(this.value.split('/')[0], this.value.split('/')[1]);
    });

    $scope.editAreaId = undefined;

    $scope.editServiceArea = function (id, flag){
        if(flag){
            $scope.editAreaId = id;
            initMap($scope.areas, false, id);
        }else{
            console.log('hello');
            initMap($scope.areas, false);
            $scope.editAreaId = id;
            $scope.editServiceAreaFlag = flag;

        }

    };


    function getPolyCoords (poly){
        console.log(poly);
        var paths = poly.getPath().getArray();
        var coords = [];

        for(var i = 0; i < paths.length; i++){
            coords.push([paths[i].lat(), paths[i].lng()])
        }

        console.log(coords);
        return coords;
    }

    $scope.$watch('serviceArea.conciergeReq', function(){
        console.log($scope.serviceArea.conciergeReq);
    });

    $scope.saveServiceArea = function (flag){
        $scope.serviceArea.serviceTime.pickup.date = $("#serviceAreaPickupDate").val();
        $scope.serviceArea.serviceTime.pickup.start = $("#serviceAreaPickupStart").val();
        $scope.serviceArea.serviceTime.pickup.end = $("#serviceAreaPickupEnd").val();

        $scope.serviceArea.serviceTime.delivery.date = $("#serviceAreaDeliveryDate").val();
        $scope.serviceArea.serviceTime.delivery.start = $("#serviceAreaDeliveryStart").val();
        $scope.serviceArea.serviceTime.delivery.end = $("#serviceAreaDeliveryEnd").val();

        $scope.serviceArea.otherServiceTime.pickup.date = $("#serviceAreaNoConPickupDate").val();
        $scope.serviceArea.otherServiceTime.pickup.start = $("#serviceAreaNoConPickupStart").val();
        $scope.serviceArea.otherServiceTime.pickup.end = $("#serviceAreaNoConPickupEnd").val();

        $scope.serviceArea.otherServiceTime.delivery.date = $("#serviceAreaNoConDeliveryDate").val();
        $scope.serviceArea.otherServiceTime.delivery.start = $("#serviceAreaNoConDeliveryStart").val();
        $scope.serviceArea.otherServiceTime.delivery.end = $("#serviceAreaNoConDeliveryEnd").val();

        $scope.serviceArea.areaType = $scope.selectedAreaType.name;

        // var ne = rectangle.getBounds().getNorthEast();
        // var sw = rectangle.getBounds().getSouthWest();


        if(flag === 'edit'){
            console.log($scope.editPolygon);
            if($scope.serviceArea.conciergeReq === false){
                $scope.serviceArea.otherServiceTime = {
                    pickup: {
                        date: "",
                        end:"",
                        start: ""
                    },
                    delivery: {
                        date: "",
                        end:"",
                        start: ""
                    },
                    notes: ""
                };
            }

            $scope.serviceArea.areaCoords = getPolyCoords($scope.editPolygon);


            var req =  {
                method: "PUT",
                url: APP_CONFIG.apiUrl + '/admin/serviceArea/'+ $scope.editAreaId,
                data: $scope.serviceArea
            };

            $http(req).then(function(res){
                if(res.data.status){
                    $scope.loadAreaByType($scope.selectedAreaType);
                    $scope.serviceArea = {
                        name: "",
                        areaType: "",
                        areaCoords: undefined,
                        conciergeReq: false,
                        serviceTime:{
                            pickup: {},
                            delivery: {},
                            notes: ""
                        },
                        otherServiceTime:{
                            pickup: {},
                            delivery: {},
                            notes: ""
                        }
                    };

                    $scope.editAreaId = null;
                    $scope.editServiceAreaFlag = false;
                    $scope.editPolygon = null;

                }
                console.log(res);
            })
        }else{
            $scope.serviceArea.areaCoords = getPolyCoords(newAreaPolygon);

            var req =  {
                method: "POST",
                url: APP_CONFIG.apiUrl + '/admin/serviceArea',
                data: $scope.serviceArea
            };

            $http(req).then(function(res){
                if(res.data === "success"){
                    $scope.loadAreaByType($scope.selectedAreaType);
                    $scope.serviceArea = {
                        name: "",
                        areaType: "",
                        areaCoords: undefined,
                        conciergeReq: false,
                        serviceTime:{
                            pickup: {},
                            delivery: {},
                            notes: ""
                        },
                        otherServiceTime:{
                            pickup: {},
                            delivery: {},
                            notes: ""
                        }
                    };

                    $scope.newServiceAreaFlag = false;
                    newAreaPolygon = null;
                }
                console.log(res);
            })
        }
    };

    $scope.deleteServiceArea = function (id, name) {
        var confirmDel = confirm("Are you sure you would like to delete the card ending in " +name +"?");

        if(confirmDel){
            var req = {
                method: "DELETE",
                url: APP_CONFIG.apiUrl + "/admin/serviceArea/" + id,
            };

            $http(req).then(function (res) {
                console.log(res);
                if(res.data.status){
                    $scope.loadAreaByType($scope.selectedAreaType);
                    $scope.editAreaId = null;
                    $scope.editServiceAreaFlag = false;
                    $scope.editPolygon = null;
                    $scope.newServiceAreaFlag = false;
                }
            })
        }

    };

    $(function () {
        $('#serviceAreaPickupDate').datetimepicker({
            format: 'YYYY.MM.DD'
        });
        $('#serviceAreaDeliveryDate').datetimepicker({
            format: 'YYYY.MM.DD'
        });
        $('#serviceAreaPickupStart').datetimepicker({
            format: 'ha'
        });
        $('#serviceAreaPickupEnd').datetimepicker({
            format: 'ha'
        });
        $('#serviceAreaDeliveryStart').datetimepicker({
            format: 'ha'
        });
        $('#serviceAreaDeliveryEnd').datetimepicker({
            format: 'ha'
        });
        $('#serviceAreaNoConPickupDate').datetimepicker({
            format: 'YYYY.MM.DD'
        });
        $('#serviceAreaNoConDeliveryDate').datetimepicker({
            format: 'YYYY.MM.DD'
        });
        $('#serviceAreaNoConPickupStart').datetimepicker({
            format: 'ha'
        });
        $('#serviceAreaNoConPickupEnd').datetimepicker({
            format: 'ha'
        });
        $('#serviceAreaNoConDeliveryStart').datetimepicker({
            format: 'ha'
        });
        $('#serviceAreaNoConDeliveryEnd').datetimepicker({
            format: 'ha'
        });
    });
});