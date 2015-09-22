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

function postHTTPObject(url, params, callback) {
	var request = false;
	if(window.XMLHttpRequest) { 
		var request = new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		try {
			var request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				var request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				request = false;
			}
		}
	};
	if (request) {
		request.open('POST', url, true);
		http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		http.setRequestHeader("Content-length", params.length);
		http.setRequestHeader("Connection", "close");
		request.send(params);
		request.onreadystatechange = function() {
			if (request.readyState != 4) return false;
			if (request.status == 200 || request.status == 304) {
				callback(request.responseText)
			}
		}
	};
};

// The Great Initializer
function init() {
	grabLocation(initMap);
	//addEvent(document.getElementById("updateButton"),'click',postHTTPObject())
};

// window.onload
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        init();
        clearInterval(readyStateCheckInterval);
    }
}, 10);