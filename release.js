function el(ele) {
	return document.getElementById(ele);
}

el("haveISRC").onclick = function() {
	if(el("haveISRC").checked == true) {
		el("isrc").disabled = false;
	} else {
		el("isrc").disabled = true;
		el("isrc").value = "";
	}
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

class Track {
	constructor(trackID) {
		this.trackID = trackID;
		this.songName = "";
		this.producers = [];
		this.contributors = [];
		this.genre = "";
		this.subgenre = "";
		this.primaryArtists = "";
		this.featuredArtists = "";
		this.songWriterName = "";
		this.previewStartTime = 0;  //integer
		this.explicitContent = false;  //boolean
		this.lyrics = "";
		this.isrc = "";
	}

	pushInfo() {
		document.getElementById("songName").value = this.songName;
		document.getElementById("genre").value = this.genre;
		document.getElementById("subgenre").value = this.subgenre;
		document.getElementById("primaryArtists").value = this.primaryArtists;
		document.getElementById("featuredArtists").value = this.featuredArtists;
	}

	pullInfo() {
		this.songName = document.getElementById("songName").value;
		this.genre = document.getElementById("genre").value;
		this.subgenre = document.getElementById("subgenre").value;
		this.primaryArtists = document.getElementById("primaryArtists").value;
		this.featuredArtists = document.getElementById("featuredArtists").value;
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
	var trackNameText = document.createTextNode("Unnamed Track");
	trackDiv.appendChild(trackNameText);
	document.getElementById("track-list").appendChild(trackDiv);
	
}

document.getElementById("add-track").onclick = function() {
	addNewSongToRelease();
	document.getElementById("track-list").scrollTop = document.getElementById("track-list").scrollHeight;
}

function onTrackSwitch(event) {
	document.getElementById("songName").value = event.target.innerHTML;
}

document.getElementById("songName").onchange = function() {
	document.getElementsByClassName("selected")[0].innerHTML = document.getElementById("songName").value;
}