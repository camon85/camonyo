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



var myDataRef = new Firebase('https://crackling-inferno-7919.firebaseio.com/maps/osaka201510/messages/');
$('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
        var name = $('#nameInput').val();
        var text = $('#messageInput').val();
        //myDataRef.set('User ' + name + ' says ' + text);
        //myDataRef.set({name: name, text: text});
        myDataRef.push({name: name, text: text});
        $('#messageInput').val('');
    }
});

myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.name, message.text);
});
function displayChatMessage(name, text) {
    $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
};