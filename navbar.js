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

var signedIn = false;

var dropButton = document.getElementById("menu-button");
var dropButton2 = document.getElementById("menu-button2");
var openLogin = document.getElementById("open-login");
var closeLogin = document.getElementById("close-login-form");
var changeToSignup = document.getElementById("signup");
var closeSignup = document.getElementById("close-signup-form");
var changeToLogin = document.getElementById("alreadyHaveAcc");
var loginButton = document.getElementById("login");
var homeLink = document.getElementById("home-link");
var dashLink = document.getElementById("dash-link");

function getEl(name) {
	return document.getElementById(name);
}

//the side bar button on the taskbar
dropButton.onclick = function() {
	document.getElementById("dropdown").style.marginLeft = "0px";
	document.getElementById("graystuff").style.display = "block";
}

//the side bar button on the side bar
dropButton2.onclick = function() {
	document.getElementById("dropdown").style.marginLeft = "-279px";
	document.getElementById("graystuff").style.display = "none";
}

//this opens up the login
openLogin.onclick = function() {
	if(signedIn == false) {
		document.getElementById("home").style.filter = "blur(10px)";
		document.getElementById("footer").style.filter = "blur(10px)";
		document.getElementById("login-form").style.marginTop = "0px";
	} else {
		document.getElementById("open-login").href = "dash.html";
	}
}

//close the login form that drops down
closeLogin.onclick = function() {
	document.getElementById("login-form").style.marginTop = "-380px";
	document.getElementById("home").style.filter = "none";
	document.getElementById("footer").style.filter = "none";
}

changeToSignup.onclick = function() {
	document.getElementById("login-form").style.marginTop = "-380px";
	document.getElementById("signup-form").style.marginTop = "0px";
}

closeSignup.onclick = function() {
	document.getElementById("signup-form").style.marginTop = "-380px";
	document.getElementById("home").style.filter = "none";
	document.getElementById("footer").style.filter = "none";
}

changeToLogin.onclick = function() {
	document.getElementById("login-form").style.marginTop = "0px";
	document.getElementById("signup-form").style.marginTop = "-380px";
}

homeLink.onclick = function() {
	window.location.href = "index.html";
}

loginButton.onclick = function() {
	var em = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(em,pass);
}

dashLink.onclick = function() {
	window.location.href = "dash.html";
}



firebase.auth().onAuthStateChanged(function(user) {
	if(user) {
		getEl("open-login").innerHTML = "My Dash";
		dashLink.style.visibility = "visible";
		signedIn = true;
	} else {
		getEl("open-login").innerHTML = "Log In";
		dashLink.style.visibility = "hidden";
		signedIn = false;
	}
})