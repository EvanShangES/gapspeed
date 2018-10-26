angular.module('gap.contact').controller('contactController', function($scope, $rootScope, $stateParams){
    console.log('hello');
    $scope.tianjin = {
        name: "Tianjin",
        email: 'lily@gaexhaust.com',
        address: {address: "Suite 1503, 65 Youyi N Rd,", country:"Hexi District, Tianjin China"},
        latLng:  {lat: 39.103088, lng: 117.204248},
        phoneNumbers: {phone: "86-22-85585197/98", fax: "86-22-85585185 (fax)"},
        officeHours: {weekdays: "Mon — Fri:  9:00am — 5:00pm (CST)", weekends: "Sat:  9:00am — 2:00pm (CST)"}
    };

    $scope.toronto = {
        name: "Toronto",
        email: 'ava@gaexhaust.com',
        address: {address: "887 Bay St, Toronto", country:"Ontario Canada"},
        latLng:  {lat: 43.663235, lng:  -79.386132},
        phoneNumbers: {phone: "416-509-2745", fax: "647-921-2345"},
        officeHours: {weekdays: "Mon — Fri:  9:00am — 5:00pm (EST)" , weekends: ""}
    };

    $scope.currentOffice = $scope.tianjin;

    $scope.changeOffice = function(office){
        $scope.currentOffice = office;
        initMap();
    };

    initMap();

    // Initialize and add the map
    function initMap() {
        // The location of Uluru
        var uluru = {lat: $scope.currentOffice.latLng.lat, lng: $scope.currentOffice.latLng.lng};
        // The map, centered at Uluru
        var map = new google.maps.Map(
            document.getElementById('map'), {zoom: 16, center: uluru});
        // The marker, positioned at Uluru
        var marker = new google.maps.Marker({position: uluru, map: map});
    }


});