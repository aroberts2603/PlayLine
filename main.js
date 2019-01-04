var config = {
    apiKey: "AIzaSyAlPoBmT7p6M0XQp-DRWB9hgqLlxDBx3qY",
    authDomain: "rough-dash.firebaseapp.com",
    databaseURL: "https://rough-dash.firebaseio.com",
    projectId: "rough-dash",
    storageBucket: "rough-dash.appspot.com",
    messagingSenderId: "139173395675"
};

if(!firebase.apps.length) {
    firebase.initializeApp(config);
}

function hide(element) {
	element.style.display = "none";
}

function show(element) {
	element.style.display = "block";
}

var openLogin = true;

var loginFormDown = false;
var signupFormDown = false

var accountDropdownHidden = true;

var openLogin = document.getElementById("open-login-form");
var closeLogin = document.getElementById("close-login-form");
var changeToSignup = document.getElementById("switch-to-signup");
var openSignup = document.getElementById("open-signup-form");
var closeSignup = document.getElementById("close-signup-form");
var changeToLogin = document.getElementById("switch-to-login");

var login = document.getElementById("login-button");
var signup = document.getElementById("signup-button");

var learnMore = document.getElementById("learn-more-container");

learnMore.onclick = function() {
	scrollOptions = {
		left: "0px",
		top: "528px",
		behavior: 'smooth'
	}
	var y = document.getElementById("main-content-for-page").offsetTop;
	window.scrollTo(0,y-50, "smooth");
}

function forceDataUpdate() {
	firebase.database().ref().once("value").then(function(snapshot){
		var total = snapshot.child("users/"+firebase.auth().currentUser.uid+"/money").val();
		document.getElementById("moneyMade").innerHTML = "$"+total;
	});
}

function appendNewSong(givenSongName) {
	var updates = {};
	updates["songs/"+givenSongName] = "active";
	return firebase.database().ref("users/"+firebase.auth().currentUser.uid).update(updates);
	displaySong(givenSongName, "active");
}

function displaySong(givenSongName, status) {
	var songDiv = document.createElement("div");
	songDiv.setAttribute("class","songDiv");
	var pauseP = document.createElement("p");
	pauseP.setAttribute("class","pauseP");
	var pauseA = document.createElement("a");
	pauseA.setAttribute("class","pauseA");
	if(status == "paused") {
		var pauseText = document.createTextNode("Resume");
	} else {
		var pauseText = document.createTextNode("Pause");
	}
	pauseA.appendChild(pauseText);
	pauseP.appendChild(pauseA);
	var songName = document.createElement("p");
	songName.setAttribute("class","songNameP");
	var songNameText = document.createTextNode(givenSongName);
	songName.appendChild(songNameText);
	songDiv.appendChild(songName);
	songDiv.appendChild(pauseP);
	document.getElementById("releases-container").appendChild(songDiv);
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;

	} else {

	}
});

var sTop = 0;
var alpha = 0;

window.onload = function() {
	document.getElementById("hero-container").style.backgroundPosition = "0px 0px";
	if(window.width < 900) {
		updateParallax();
	}
}

window.onscroll = function() {
	if(window.width < 900) {
		updateParallax();
	}
}

function updateParallax() {
	sTop = document.documentElement.scrollTop;
	document.getElementById("hero-container").style.backgroundPosition = "0px " + sTop/4.0 + "px";
	if(sTop < 400) {
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.55)";
	} else if(sTop >= 400 && sTop <= 460) {
		alpha = (sTop - 400)/200;
		alpha += 0.55;
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0," + alpha + ")";
	} else if(sTop > 460) {
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.85)";
	}
}