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


var dash = document.getElementById("dashboard");
var home = document.getElementById("home");


var dropButton = document.getElementById("menu-button");
var dropButton2 = document.getElementById("menu-button2");
var openLogin = document.getElementById("open-login");
var closeLogin = document.getElementById("close-login-form");
var changeToSignup = document.getElementById("signup");
var closeSignup = document.getElementById("close-signup-form");
var changeToLogin = document.getElementById("alreadyHaveAcc");
var loginButton = document.getElementById("login");
var goNow = document.getElementById("goNow");
var homeLink = document.getElementById("home-link");
var dashLink = document.getElementById("dash-link");

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
	if(openLogin == true) {
		document.getElementById("dashboard").style.filter = "blur(10px)";
		document.getElementById("home").style.filter = "blur(10px)";
		document.getElementById("footer").style.filter = "blur(10px)";
		document.getElementById("login-form").style.marginTop = "0px";
	} else {
		show(dash);
		hide(home);
	}
}

//close the login form that drops down
closeLogin.onclick = function() {
	document.getElementById("login-form").style.marginTop = "-380px";
	document.getElementById("dashboard").style.filter = "none";
	document.getElementById("home").style.filter = "none";
	document.getElementById("footer").style.filter = "none";
}

changeToSignup.onclick = function() {
	document.getElementById("login-form").style.marginTop = "-380px";
	document.getElementById("signup-form").style.marginTop = "0px";
}

closeSignup.onclick = function() {
	document.getElementById("signup-form").style.marginTop = "-380px";
	document.getElementById("dashboard").style.filter = "none";
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

dashLink.onclick = function() {
	window.location.href = "dash.html";
}

loginButton.onclick = function() {
	var em = document.getElementById("email").value;
	var pass = document.getElementById("password").value;
	firebase.auth().signInWithEmailAndPassword(em,pass);
}

goNow.onclick = function() {
	document.getElementById("dashboard").style.filter = "blur(10px)";
	document.getElementById("home").style.filter = "blur(10px)";
	document.getElementById("footer").style.filter = "blur(10px)";
	document.getElementById("signup-form").style.marginTop = "0px";
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
		document.getElementById("footer").style.filter = "none";
		document.getElementById("login-form").style.marginTop = "-380px";
		document.getElementById("signup-form").style.marginTop = "-380px";

		// User is signed in.
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;

		getEl("open-login").innerHTML = "My Dash";
		dashLink.style.visibility = "visible";
		openLogin = false;

	} else {
		getEl("open-login").innerHTML = "Log In";
		dashLink.style.visibility = "hidden";
		openLogin = true;
	}
});

// window.onload = function() {
	// firebase.database().ref("users/"+firebase.auth().currentUser.uid+"/songs").once("value", function(snapshot) {
	// 		document.getElementById("releases-container").innerHTML = "";
	// 		for(key in snapshot.val()) {
	// 			displaySong(key, snapshot.val()[key]);
	// 		}
	// });
// }