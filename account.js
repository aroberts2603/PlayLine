var oldSH = document.getElementById("old-s-h");
var newSH = document.getElementById("new-s-h");
var confSH = document.getElementById("conf-s-h");

oldSH.onclick = function() {
	if(oldSH.innerHTML == "show") {
		document.getElementById("old-acc-pass").type = "text";
		oldSH.innerHTML = "hide";
	} else if(oldSH.innerHTML == "hide") {
		document.getElementById("old-acc-pass").type = "password";
		oldSH.innerHTML = "show";
	}
}

newSH.onclick = function() {
	if(newSH.innerHTML == "show") {
		document.getElementById("new-acc-pass").type = "text";
		newSH.innerHTML = "hide";
	} else if(newSH.innerHTML == "hide") {
		document.getElementById("new-acc-pass").type = "password";
		newSH.innerHTML = "show";
	}
}

confSH.onclick = function() {
	if(confSH.innerHTML == "show") {
		document.getElementById("conf-acc-pass").type = "text";
		confSH.innerHTML = "hide";
	} else if(confSH.innerHTML == "hide") {
		document.getElementById("conf-acc-pass").type = "password";
		confSH.innerHTML = "show";
	}
}

document.getElementById("profile-photo-upload-button").onclick = function() {
	document.getElementById("profile-photo-upload").click();
}

var artistButton = document.getElementById("update-artist-info");
var accButton = document.getElementById("update-acc-info");
var miscButton = document.getElementById("update-misc-info");

function checkArtistName() {
	firebase.database().ref().once("value").then(function(snapshot) {
		if((snapshot.child("users/"+firebase.auth().currentUser.uid+"/artistName").val()) != "") {
			document.getElementById("artist-name").value = (snapshot.child("users/"+firebase.auth().currentUser.uid+"/artistName").val());
			document.getElementById("artist-name").disabled = true;
			document.getElementById("artist-name").style.backgroundColor = "#ddd";
		}
	});
}

checkArtistName();

artistButton.onclick = function() {
	firebase.database().ref("users/"+firebase.auth().currentUser.uid).update({
		"artistName": document.getElementById("artist-name").value
	});
	if(document.getElementById("profile-photo-upload").files[0] != null) {
		firebase.database().ref().once("value").then(function(snapshot) {
			if((snapshot.child("users/"+firebase.auth().currentUser.uid+"/artistName").val()) != "") {
				var reader = new FileReader();
				reader.onload = function (e) {
		    		var data = this.result;
		    		firebase.database().ref("users/"+firebase.auth().currentUser.uid).update({
		    			"photo": data
		    		});
				}
				reader.readAsDataURL(document.getElementById("profile-photo-upload").files[0]);
				firebase.database().ref().once("value").then(function(snapshot) {
					document.getElementById("profile-photo-image").src = (snapshot.child("users/"+firebase.auth().currentUser.uid+"/photo").val());
				});
			} else {
				document.getElementById("You must have an Artist Name to upload a profile photo.");
			}
		});
	}
}

document.getElementById("profile-photo-upload").onchange = function() {
	if(document.getElementById("profile-photo-upload").files[0] != null) {
		document.getElementById("profile-photo-upload-name").innerHTML = document.getElementById("profile-photo-upload").files[0].name;
	}
}