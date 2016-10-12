window.onload = init;
fiction init() {
var button = document.getElementById(“addButton”);
button.onclick = handleButtonClick;
}

function handleButtonClick() {
	alert(“Button was clicked”);
}
