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
var menuOpen = false;

var openLogin = true;

var loginFormDown = false;
var signupFormDown = false

var accountDropdownHidden = true;

var newAcc = false;

var openLogin = document.getElementById("open-login-form");
var closeLogin = document.getElementById("close-login-form");
var changeToSignup = document.getElementById("switch-to-signup");
var openSignup = document.getElementById("open-signup-form");
var closeSignup = document.getElementById("close-signup-form");
var changeToLogin = document.getElementById("switch-to-login");

var login = document.getElementById("login-button");
var signup = document.getElementById("signup-button");

var dropButton = document.getElementById("menu-button");
var dropButton2 = document.getElementById("menu-button2");

function getLm(name) {
	return document.getElementById(name);
}

//the side bar button on the taskbar
// dropButton.onclick = function() {
// 	if(menuOpen == false) {
// 		document.getElementById("dropdown").style.marginLeft = "0px";
// 		document.getElementById("graystuff").style.display = "block";
// 		setTimeout(function() {
// 			getLm("third-of-hamburger1").style.transform = "rotate(45deg)";
// 			getLm("third-of-hamburger2").style.transform = "rotate(45deg)";
// 			getLm("third-of-hamburger3").style.transform = "rotate(-45deg)";
// 		}, 150);
// 		getLm("third-of-hamburger1").style.top = "28px";
// 		getLm("third-of-hamburger3").style.top = "28px";
// 		menuOpen = true;
// 	} else {
// 		document.getElementById("dropdown").style.marginLeft = "-279px";
// 		document.getElementById("graystuff").style.display = "none";
// 		setTimeout(function() {
// 			getLm("third-of-hamburger1").style.top = "12px";
// 			getLm("third-of-hamburger3").style.top = "44px";
// 		}, 150);
// 		getLm("third-of-hamburger1").style.transform = "rotate(0deg)";
// 		getLm("third-of-hamburger2").style.transform = "rotate(0deg)";
// 		getLm("third-of-hamburger3").style.transform = "rotate(0deg)";
// 		menuOpen = false;
// 	}
// }

openLogin.onclick = function() {
	document.getElementById("signup-form").style.top = "-290px";
	document.getElementById("login-form").style.top = "calc(50% - 200px)";
	document.getElementById("graystuff").style.display = "block";
	document.getElementById("email").focus();
}

closeLogin.onclick = function() {
	document.getElementById("login-form").style.top = "-290px";
	document.getElementById("graystuff").style.display = "none";
}

changeToSignup.onclick = function() {
	document.getElementById("login-form").style.top = "-290px";
	document.getElementById("signup-form").style.top = "calc(50% - 200px)";
}

openSignup.onclick = function() {
	document.getElementById("login-form").style.top = "-290px";
	document.getElementById("signup-form").style.top = "calc(50% - 200px)";
	document.getElementById("graystuff").style.display = "block";
	document.getElementById("newEmail").focus();
}

closeSignup.onclick = function() {
	document.getElementById("signup-form").style.top = "-290px";
	document.getElementById("graystuff").style.display = "none";
}

changeToLogin.onclick = function() {
	document.getElementById("login-form").style.top = "calc(50% - 200px)";
	document.getElementById("signup-form").style.top = "-290px";
}

login.onclick = function() {
	firebase.auth().signInWithEmailAndPassword(document.getElementById("email").value,document.getElementById("password").value);
	newAcc = false;
}

signup.onclick = function() {
	firebase.auth().createUserWithEmailAndPassword(document.getElementById("newEmail").value,document.getElementById("newPassword").value);
	newAcc = true;
}

function finishSignup() {
	var email = document.getElementById("newEmail").value;
	var first = document.getElementById("first").value;
	var last = document.getElementById("last").value;
	var money = 0;
	firebase.database().ref("users/"+firebase.auth().currentUser.uid).set({
		"email": email,
		"first": first,
		"last": last,
		"money": money
	});
}

document.getElementById("logout").onclick = function() {
	firebase.auth().signOut();
	document.getElementById("dropdown-arrow").onclick();
	window.location.href = "index.html";
}

document.getElementById("dropdown-arrow").onclick = function() {
	if(accountDropdownHidden) {
		document.getElementById("account-dropdown").style.height = "160px";
		accountDropdownHidden = false;
	} else {
		document.getElementById("account-dropdown").style.height = "0px";
		accountDropdownHidden = true;
	}
}

document.getElementById("email").addEventListener("keyup", function(event) {
	event.preventDefault();

	if(event.keyCode === 13) {
		document.getElementById("password").focus();
	}
});

document.getElementById("password").addEventListener("keyup", function(event) {
	event.preventDefault();

	if(event.keyCode === 13) {
		document.getElementById("login-button").click();
	}
});

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

		closeLogin.onclick();
		closeSignup.onclick();

		if(newAcc) {
			finishSignup();
		}

		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;

		openLogin = false;

		document.getElementById("profile-photo").style.display = "inline";
		document.getElementById("dropdown-arrow-container").style.display = "inline";
		document.getElementById("account-dropdown").style.display = "block";

		document.getElementById("open-login-form").style.display = "none";
		document.getElementById("open-signup-form").style.display = "none";

	} else {
		openLogin = true;

		document.getElementById("profile-photo").style.display = "none";
		document.getElementById("dropdown-arrow-container").style.display = "none";
		document.getElementById("account-dropdown").style.display = "none";

		document.getElementById("open-login-form").style.display = "inline-block";
		document.getElementById("open-signup-form").style.display = "inline-block";
	}
});