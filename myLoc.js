window.onload = getMyLocation;

//global Variable(s)
var ourCoords = {
  latitude: 47.625851,
  longitude: -122.52099
};

var map;

//getting my location 
function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation, displayError);
  } else {
    alert("Oops. No Geolocation support");
  }
}

//displaying location with success Handler
function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  
  var div = document.getElementById("location");
  div.innerHTML = "Your are at a latitude: " + latitude + ", Longitude: " + longitude;
  
  var km = computeDistances(position.coords, ourCoords);
  var distance = document.getElementById("distance");
  distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";
  
  showMap(position.coords);
}

//debugging/error Handler if location is not provided 
function displayError(error) {
     var errorTypes = {
     0: "Unknown",
     1: "Permission denies by user",
     2: "Position is not available",
     3: "Request timed out",
   };
  var errorMessage = errorTypes[error.code];
  if (error.code == 0 || error.code == 2) {
    errorMessage = errorMessage + " " + error.message;
  }
  var div = document.getElementById("location");
  div.innerHTML = errorMessage;
}

//Obtaining the distance between two points 
function computeDistances(startCoords, destCoords) {
  var startLatRads = degreesToRadians(startCoords.latitude);
  var startLongRads = degreesToRadians(startCoords.longitude);
  var destLatRads = degreesToRadians(startCoords.latitude);
  var destLongRads = degreesToRadians(startCoords.longitude);
  
  var Radius = 6371; // radius of the earth in km
  var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
                           Math.cos(startLatRads) * Math.cos(destLatRads) *
                           Math.cos(startLongRads - destLongRads)) * Radius;
  return distance;
}

function degreesToRadians(degrees) {
  var radians = (degrees * Math.PI)/180;
  return radians;
}

//Displaying the map 
function showMap(coords) {
  var googleLatAndLng = 
      new google.maps.LatLng(coords.latitude,
                             coords.longitude);
  
  var mapOptions = {
    zoom: 10,
    center: googleLatAndLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapDiv = document.getElementById("map");
  map = new google.maps.Map(mapDiv, mapOptions);
}
