function el(ele) {
	return document.getElementById(ele);
}

el("contributorTitle").onchange = function() {
	indexToUse = el("contributorTitle").value.split(":");
	el("contributorName").value = indexToUse[1];
}

el("contributorName").onchange = function() {
	indexToUse = el("contributorTitle").value.split(":");
	indexToUse[1] = el("contributorName").value;
	var selectOptionToEditValueOf = "contributor" + indexToUse[0];
	el(selectOptionToEditValueOf).value = indexToUse.join(":");
}


// document.getElementById("releasedBeforeYes").onclick = function() {
// 	document.getElementById("releasedBeforeDateDiv").style.display = "inline";
// }

// document.getElementById("releasedBeforeNo").onclick = function() {
// 	document.getElementById("releasedBeforeDateDiv").style.display = "none";
// }

// document.getElementById("releaseDateASAP").onclick = function() {
// 	document.getElementById("specificReleaseDateDiv").style.display = "none";
// }

// document.getElementById("releaseDateSpecific").onclick = function() {
// 	document.getElementById("specificReleaseDateDiv").style.display = "inline";
// }

var tracks = [];

class Track {
	constructor(trackID) {
		this.trackID = trackID;
		this.songName = ""; //done
		this.producers = ""; //done
		this.contributors = {
			Actor: "",
			Arranger: "",
			Choir: "",
			Composer: "",
			Conductor: "",
			Engineer: "",
			Ensemble: "",
			Lyricist: "",
			Mixer: "",
			Orchestra: "",
			Remixer: "",
			Soloist: ""
		};
		this.genre = ""; //done
		this.subgenre = ""; //done
		this.primaryArtists = ""; //done
		this.featuredArtists = ""; //done
		this.songWriterName = "";
		this.previewStartTime = ""; //done
		this.explicitContent = null; //done
		this.lyrics = "";
		this.isrc = "";
	}

	pushInfo() {
		document.getElementById("songName").value = this.songName;
		document.getElementById("genre").value = this.genre;
		document.getElementById("subgenre").value = this.subgenre;
		document.getElementById("primaryArtists").value = this.primaryArtists;
		document.getElementById("featuredArtists").value = this.featuredArtists;
		document.getElementById("producers").value = this.producers;
		if(this.explicitContent) {
			document.getElementById("expTrue").checked = true;
			document.getElementById("expFalse").checked = false;
		} else if(this.explicitContent == false) {
			document.getElementById("expTrue").checked = false;
			document.getElementById("expFalse").checked = true;
		}
		document.getElementById("startTime").value = this.previewStartTime;
	}

	pullInfo() {
		this.songName = document.getElementById("songName").value;
		this.genre = document.getElementById("genre").value;
		this.subgenre = document.getElementById("subgenre").value;
		this.primaryArtists = document.getElementById("primaryArtists").value;
		this.featuredArtists = document.getElementById("featuredArtists").value;
		this.producers = document.getElementById("producers").value;
		if(document.getElementById("expFalse").checked) {
			this.explicitContent = false;
		} else if(document.getElementById("expTrue").checked) {
			this.explicitContent = true;
		}
		this.previewStartTime = document.getElementById("startTime").value;
	}
}



el("language").onchange = function() {
	if(el("language").value == "other") {
		el("otherLangDiv").style.display = "inline";
		el("language").style.marginBottom = "5px";
	} else {
		el("otherLangDiv").style.display = "none";
		el("language").style.marginBottom = "0px";
	}
}

function trackClicked(event) {
	var arr = document.getElementsByClassName("track");
	var i = 0;
	for(i = 0;i<arr.length;i++) {
		arr[i].setAttribute("class", "track");
	}
	event.target.setAttribute("class", "track selected");

	onTrackSwitch(event);
}

function addNewSongToRelease() {
	var trackDiv = document.createElement("div");
	trackDiv.setAttribute("class", "track");
	trackDiv.setAttribute("onclick", "trackClicked(event)");
	trackDiv.setAttribute("id", "track-"+tracks.length);
	var trackNameText = document.createTextNode("Unnamed Track");
	trackDiv.appendChild(trackNameText);
	document.getElementById("track-list").appendChild(trackDiv);
	let newTrack = new Track(tracks.length);
	tracks.push(newTrack);
}

document.getElementById("add-track").onclick = function() {
	addNewSongToRelease();
	document.getElementById("track-list").scrollTop = document.getElementById("track-list").scrollHeight;
}

function onTrackSwitch(event) {
	document.getElementById("songName").value = event.target.innerHTML;
	var trackID = event.target.getAttribute("id")[6];
	tracks[trackID].pushInfo();	
}

document.getElementById("first-form").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
}

document.getElementById("songName").onchange = function() {
	document.getElementsByClassName("selected")[0].innerHTML = document.getElementById("songName").value;
}

var fileUp = document.getElementById("file");

fileUp.onchange = function() {
	var reader = new FileReader();
	var file = fileUp.files[0];
	var preview = document.getElementById("preview");

	reader.onload = function() {
		preview.src = reader.result;
	}

	reader.readAsDataURL(file);
}

var form = document.getElementById("release-form");
var trackName = document.getElementById("songName").value;

form.onsubmit = function(event) {
	event.preventDefault();
	var files = fileUp.files;

	

	var i = 0;
	for(i = 0;i<tracks.length;i++) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'agh.php', true);
		var formData = new FormData();
		formData.append("albumName", "album");
		formData.append("fileToUpload", files[0], files[0].name);
		formData.append("trackName", tracks[i].songName);
		xhr.send(formData);
	}
}