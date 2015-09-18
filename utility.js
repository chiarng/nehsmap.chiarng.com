// JavaScript Document

// variable declarations

// cross-browser support for attaching event listeners
function addEvent(element, event, func) {
	if (element.attachEvent)
		return element.attachEvent('on' + event, func);
	else
		return element.addEventListener(event, func, false);
};

// The Great Initializer
function init() {
	// auth2 is initialized with gapi.auth2.init() and a user is signed in.
	if (auth2.isSignedIn.get()) {
	  var profile = auth2.currentUser.get().getBasicProfile();
	  console.log('ID: ' + profile.getId());
	  console.log('Name: ' + profile.getName());
	  console.log('Image URL: ' + profile.getImageUrl());
	  console.log('Email: ' + profile.getEmail());
	}
};

// window.onload
var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        init();
        clearInterval(readyStateCheckInterval);
    }
}, 10);