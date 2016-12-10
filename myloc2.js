var ourCoords =  {
	latitude: 47.624851,
	longitude: -122.52099
};
var watchId = null;
var options = {enableHighAccuracy: true, timeout: 100, maximumAge: 0};
window.onload = getMyLocation;

			//*WATCH POSITION*//
function watchLocation() {
	watchId = navigator.geolocation.watchPosition(displayLocation, 
						      displayError,
						     options);
}

			//*getMyLocation*//
function getMyLocation() {
	if (navigator.geolocation) {
		var watchButton = document.getElementById("watch");
		watchButton.onclick = watchLocation;
		var clearWatchButton = document.getElementById("clearWatch");
		clearWatchButton.onclick = clearWatch;
	} else {
		alert("Oops, no geolocation support");
	}
}

			//*errorHandler*//
function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by the user",
		2: "Position is not available",
		3: "Request timed out"
	};

	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
	options.timeout += 100;
	navigator.geolocation.getCurrentPosition(
		displayLocation,
		displayError,
		options);
	div.innerHTML += " ... chacking again with timeout " + options.timeout;
}
			//*clearWatch*//
function clearWatch() {
	if (watchId != null) {
		navigator.geolocation.clearWatch(watchId);
		watchID = null;
	}
}

			//*displayLocation*//
function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	
	div.innerHTML = "You are at latitude: " + latitude + " , Longitude: " + longitude;
	div.innerHTML += " (found in " + options.timeout + " milliseconds)";

	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	if (km < 0.1) {
		distance.innerHTML = "You're on fire!";
	} else {
		if (km < prevKm) {
			distance.innerHTML = "You're getting hotter!";
		} else {
			distance.innerHTML = "You're getting colder. . .";
		}
	}
	var prevKm = km;
	
	if (map == null) {
		showMap(position.coords);
	} else {
		scrollMapToPosition(position.coords);
	}
}

			//*COMPUTING DISTANCE*//
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	
	
var Radius = 6371; // radius of the earth in km
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
			Math.cos(startLatRads) * Math.cos(destLatRads) *
			Math.cos(startLongRads - destLongRads)) * Radius;;


	return distance;

}

	function degreesToRadians(degrees) {
		 radians = (degrees * Math.PI)/180;
	return radians;
}

var map;

function showMap(coords) {
	var googleLatAndLong =
		new google.maps.LatLng(coords.latitude,
				       coords.longitude);

	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	
	//* adding the marker*//
	var title = "Your Location";
	var content = "You are here: " + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}


function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);
	
	var infoWindowOptions = {
		content: content,
		position: latlong
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
}

function scrollMapToPosition(coords) {
	var latitude = coords.latitude;
	var longitude = coords.longitude;
	var latlong = new google.maps.LatLong(latitude, longitude);
	
	map.panTo(latlong);
	
	addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
