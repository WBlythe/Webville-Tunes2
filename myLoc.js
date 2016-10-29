window.onload = getMyLocation;

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
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
