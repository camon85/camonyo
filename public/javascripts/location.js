var dmcStation = {lat: 37.575313, lng: 126.900000};
var enm = {lat: 37.578308, lng: 126.891684};
var starbucks = {lat:37.581594, lng: 126.890530};

var locations = [];
locations.push(dmcStation);
locations.push(enm);
locations.push(starbucks);

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: dmcStation,
        zoom: 15
    });

    var infoWindow = new google.maps.InfoWindow({map: map});

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('현재위치');
            map.setCenter(pos)
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    showMakers();
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
}

function showMakers() {
    for(var locationIndex in locations) {
        showMaker(locations[locationIndex]);
    }

}

function showMaker(pos) {
    var marker = new google.maps.Marker({map: map, position: pos});
}


//////////////////////
//////////////////////
//////////////////////



