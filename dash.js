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

function getEl(name) {
	return document.getElementById(name);
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
		// User is signed in.
		var displayName = user.displayName;
		var email = user.email;
		var emailVerified = user.emailVerified;
		var photoURL = user.photoURL;
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;
		var providerData = user.providerData;

		getEl("open-login").innerHTML = "My Dash";
		openLogin = false;
		getEl("dash-link").style.visibility = "visible";

		forceDataUpdate();

		firebase.database().ref("users/"+uid+"/songs").on("value", function(snapshot) {
			document.getElementById("releases-container").innerHTML = "";
			for(key in snapshot.val()) {
				displaySong(key, snapshot.val()[key]);
			}
			if(getEl("releases-container").innerHTML == "") {
				getEl("releases-container").innerHTML = "<p>Click the release button below to release your first song!</p>"
			}
		});


	} else {
		getEl("open-login").innerHTML = "Log In";
		openLogin = true;
	}
});

firebase.database().ref().on("value", function(snapshot){
	if(firebase.auth().currentUser != null) {
		var total = snapshot.child("users/"+firebase.auth().currentUser.uid+"/money").val();
		document.getElementById("moneyMade").innerHTML = "$"+total;
	}
});