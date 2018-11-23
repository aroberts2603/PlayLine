// Initialize Firebase
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

function getEl(name) {
	return document.getElementById(name);
}

var openLogin = true;

var accountDropdownHidden = true;


var dash = document.getElementById("dashboard");
var home = document.getElementById("home");


var openLogin = document.getElementById("open-login");
var closeLogin = document.getElementById("close-login-form");
var changeToSignup = document.getElementById("signup");
var closeSignup = document.getElementById("close-signup-form");
var changeToLogin = document.getElementById("alreadyHaveAcc");
var loginButton = document.getElementById("login");
var homeLink = document.getElementById("home-link");
var dashLink = document.getElementById("dash-link");

var learnMore = document.getElementById("learn-more-container");

//this opens up the login
// openLogin.onclick = function() {
// 	if(openLogin == true) {
// 		document.getElementById("main-grid").style.filter = "blur(10px)";
// 		document.getElementById("login-form").style.marginTop = "0px";
// 	} else {
// 		window.location.href = "dash.html";
// 	}
// }

//close the login form that drops down
// closeLogin.onclick = function() {
// 	document.getElementById("login-form").style.marginTop = "-380px";
// 	document.getElementById("main-grid").style.filter = "none";
// }

// changeToSignup.onclick = function() {
// 	document.getElementById("login-form").style.marginTop = "-380px";
// 	document.getElementById("signup-form").style.marginTop = "0px";
// }

// closeSignup.onclick = function() {
// 	document.getElementById("signup-form").style.marginTop = "-380px";
// 	document.getElementById("main-grid").style.filter = "none";
// }

// changeToLogin.onclick = function() {
// 	document.getElementById("login-form").style.marginTop = "0px";
// 	document.getElementById("signup-form").style.marginTop = "-380px";
// }

// homeLink.onclick = function() {
// 	window.location.href = "index.html";
// }

// dashLink.onclick = function() {
// 	window.location.href = "dash.html";
// }

// loginButton.onclick = function() {
// 	var em = document.getElementById("email").value;
// 	var pass = document.getElementById("password").value;
// 	firebase.auth().signInWithEmailAndPassword(em,pass);
// }

learnMore.onclick = function() {
	scrollOptions = {
		left: "0px",
		top: "528px",
		behavior: 'smooth'
	}
	window.scrollTo(0,528, "smooth");
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
		// document.getElementById("footer").style.filter = "none";
		// document.getElementById("login-form").style.marginTop = "-380px";
		// document.getElementById("signup-form").style.marginTop = "-380px";

		// User is signed in.
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;

		// getEl("open-login").innerHTML = "My Dash";
		// dashLink.style.visibility = "visible";
		openLogin = false;

	} else {
		getEl("open-login").innerHTML = "Log In";
		dashLink.style.visibility = "hidden";
		openLogin = true;
	}
});

var sTop = 0;
var alpha = 0;

window.onload = function() {
	document.getElementById("hero-container").style.backgroundPosition = "0px 0px";
	updateParallax();
}

window.onscroll = function() {
	updateParallax();
}

function updateParallax() {
	sTop = document.documentElement.scrollTop;
	document.getElementById("hero-container").style.backgroundPosition = "0px " + sTop/-4.0 + "px";
	if(sTop < 400) {
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.55)";
	} else if(sTop >= 400 && sTop <= 460) {
		alpha = (sTop - 400)/200;
		alpha += 0.55;
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0," + alpha + ")";
		console.log(alpha);
	} else if(sTop > 460) {
		document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.85)";
	}
}

document.getElementById("dropdown-arrow").onclick = function() {
	if(accountDropdownHidden) {
		document.getElementById("account-dropdown").style.height = "168px";
		accountDropdownHidden = false;
	} else {
		document.getElementById("account-dropdown").style.height = "0px";
		accountDropdownHidden = true;
	}
}