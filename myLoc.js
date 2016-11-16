window.onload = getMyLocation;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation, displayError);
  } else {
    alert("Oops. No Geolocation support");
  }
}

function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  
  var div = document.getElementById("location");
  div.innerHTML = "Your are at a latitude: " + latitude + ", Longitude: " + longitude;
}

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
