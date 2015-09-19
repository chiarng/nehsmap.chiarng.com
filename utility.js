// JavaScript Document

// variable declarations
var map;
var marker;

// cross-browser support for attaching event listeners
function addEvent(element, event, func) {
	if (element.attachEvent)
		return element.attachEvent('on' + event, func);
	else
		return element.addEventListener(event, func, false);
};

function onSignIn(googleUser) {
	// Useful data for your client-side scripts:
	var profile = googleUser.getBasicProfile();
	console.log("ID: " + profile.getId()); // Don't send this directly to your server!
	console.log("Name: " + profile.getName());
	console.log("Image URL: " + profile.getImageUrl());
	console.log("Email: " + profile.getEmail());

	// The ID token you need to pass to your backend:
	var id_token = googleUser.getAuthResponse().id_token;
	console.log("ID Token: " + id_token);
};

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      	console.log('User signed out.');
    });
};

function initMap(initialLocation) {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
	    center: initialLocation
	});
	marker = new google.maps.Marker({
		map: map,
		draggable: true,
		animation: google.maps.Animation.DROP,
		position: initialLocation
	});
	marker.addListener('click', toggleBounce);
};

function toggleBounce() {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
};

function grabLocation(callback) {
	if (navigator.geolocation) {
     	navigator.geolocation.getCurrentPosition(function (position) {
        	initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        	callback(initialLocation);
    	});
	};
};

// The Great Initializer
function init() {
	grabLocation(initMap);
};

// window.onload
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        init();
        clearInterval(readyStateCheckInterval);
    }
}, 10);