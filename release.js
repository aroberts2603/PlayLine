function el(ele) {
	return document.getElementById(ele);
}

var tracks = [];

class Track {
	constructor(trackID) {
		this.trackID = trackID;		//done
		this.songName = "";			//done
		this.producers = "";		//done
		this.contributors = {		//done
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
		};							//done
		this.genre = "";			//done
		this.subgenre = "";			//done
		this.primaryArtists = "";	//done
		this.featuredArtists = "";	//done
		this.songWriterName = "";	//done
		this.previewStartTime = "";	//done
		this.explicitContent = null;//done
		this.language = "select";	//done
		this.isrc = "";				//done
		this.file = null;			//done
		this.fileName = "";			//done
		this.beatLicence = null;	//done
		this.beatLicenceName = "";	//done
		this.beatProof = null;		//done
		this.beatProofName = "";	//done
		this.prevRelease = "";		//done
	}

	pushInfo() {
		document.getElementById("songName").value = this.songName;
		document.getElementById("genre").value = this.genre;
		document.getElementById("subgenre").value = this.subgenre;
		document.getElementById("primaryArtists").value = this.primaryArtists;
		document.getElementById("featuredArtists").value = this.featuredArtists;
		document.getElementById("producers").value = this.producers;
		document.getElementById("isrc").value = this.isrc;
		if(this.explicitContent) {
			document.getElementById("expTrue").checked = true;
			document.getElementById("expFalse").checked = false;
		} else if(this.explicitContent == false) {
			document.getElementById("expTrue").checked = false;
			document.getElementById("expFalse").checked = true;
		} else if(this.explicitContent == null) {
			document.getElementById("expTrue").checked = false;
			document.getElementById("expFalse").checked = false;
		}
		if(this.file == null) {
			document.getElementById("file").value = null;
		}
		if(this.beatLicence == null) {
			document.getElementById("beat-licence").value = null;
		}
		if(this.beatProof == null) {
			document.getElementById("beat-proof").value = null;
		}
		document.getElementById("startTime").value = this.previewStartTime;
		if(this.language != "nolyrics" && this.language != "english" && this.language != "spanish" && 
			this.language != "french" && this.language != "mandarin" && this.language != "select") {
			document.getElementById("otherLang").value = this.language;
			document.getElementById("language").value = "other";
		} else {
			document.getElementById("language").value = this.language;
		}
		if(this.fileName == "") {
			document.getElementById("file-upload-name").innerHTML = "No File";
		} else {
			document.getElementById("file-upload-name").innerHTML = this.fileName;
		}
		if(this.beatLicenceName == "") {
			document.getElementById("beat-licence-upload-name").innerHTML = "No File";
		} else {
			document.getElementById("beat-licence-upload-name").innerHTML = this.beatLicenceName;
		}
		if(this.beatProofName == "") {
			document.getElementById("beat-proof-upload-name").innerHTML = "No File";
		} else {
			document.getElementById("beat-proof-upload-name").innerHTML = this.beatProofName;
		}
		document.getElementById("songwriter").value = this.songWriterName;
		if(this.prevRelease != "none-given") {
			document.getElementById("prevRelease").value = this.prevRelease;
		} else {
			document.getElementById("prevRelease").value = "";
		}
	}

	pullInfo() {
		this.songName = document.getElementById("songName").value;
		this.genre = document.getElementById("genre").value;
		this.subgenre = document.getElementById("subgenre").value;
		this.primaryArtists = document.getElementById("primaryArtists").value;
		this.featuredArtists = document.getElementById("featuredArtists").value;
		this.producers = document.getElementById("producers").value;
		this.isrc = document.getElementById("isrc").value;
		if(document.getElementById("expFalse").checked) {
			this.explicitContent = false;
		} else if(document.getElementById("expTrue").checked) {
			this.explicitContent = true;
		}
		this.previewStartTime = document.getElementById("startTime").value;
		if(document.getElementById("language").value == "other") {
			this.language = document.getElementById("otherLang").value;
		} else {
			this.language = document.getElementById("language").value;
		}
		this.file = document.getElementById("file").files[0];
		if(document.getElementById("file").files[0] != null) {
			this.fileName = document.getElementById("file").files[0].name;
		}
		this.songWriterName = document.getElementById("songwriter").value;
		this.beatLicence = document.getElementById("beat-licence").files[0];
		if(document.getElementById("beat-licence").files[0] != null) {
			this.beatLicenceName = document.getElementById("beat-licence").files[0].name;
		}
		this.beatProof = document.getElementById("beat-proof").files[0];
		if(document.getElementById("beat-proof").files[0] != null) {
			this.beatProofName = document.getElementById("beat-proof").files[0].name;
		}
		if(document.getElementById("prevRelease") != "") {
			this.prevRelease = document.getElementById("prevRelease").value;
		} else {
			this.prevRelease = "none-given";
		}
	}

	checkRequired() {
		if(this.songName == "" || this.genre == "" || this.primaryArtists == "" || this.explicitContent == null || this.previewStartTime == "" 
			|| this.language == "select" || this.file.length == 0 || this.songWriterName == "") {
			return false;
		} else {
			return true;
		}
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

document.getElementById("contributorTitle").onchange = function() {
	var contIndex = document.getElementById("contributorTitle").value;
	document.getElementById("contributorName").value = tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].contributors[contIndex];
}

document.getElementById("contributorName").onchange = function() {
	var contIndex = document.getElementById("contributorTitle").value;
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].contributors[contIndex] = document.getElementById("contributorName").value; 
}

function trackClicked(event) {
	document.getElementById("add-song-text").style.display = "none";
	document.getElementById("first-form").style.display = "inline-grid";
	document.getElementById("album-info-form").style.display = "none";
	document.getElementById("album-info").setAttribute("class", "album-info");
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
	var trackNameText = document.createTextNode((tracks.length+1) + " - New Track");
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
	var trackID = event.target.getAttribute("id")[6];
	tracks[trackID].pushInfo();	
}

document.getElementById("album-info").onclick = function() {
	if(document.getElementsByClassName("selected")[0] != null) {
		document.getElementsByClassName("selected")[0].setAttribute("class", "track");
	}
	document.getElementById("album-info").setAttribute("class", "album-info selected");
	document.getElementById("first-form").style.display = "none";
	document.getElementById("add-song-text").style.display = "none";
	document.getElementById("album-info-form").style.display = "inline-grid";
}

document.getElementById("first-form").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
}

document.getElementById("file").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pushInfo();
}

document.getElementById("beat-licence").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pushInfo();
}

document.getElementById("beat-proof").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pushInfo();
}

document.getElementById("songName").onchange = function() {
	var id = document.getElementsByClassName("selected")[0].getAttribute("id").split("-")[1];
	tracks[id].pullInfo();
	document.getElementsByClassName("selected")[0].innerHTML = parseInt(id) + 1 + " - " + tracks[id].songName;
}

document.getElementById("specificDate").onclick = function() {
	if(document.getElementById("specificDate").checked) {
		document.getElementById("releaseDateText").style.display = "inline-block";
		document.getElementById("specificReleaseDate").style.display = "inline-block";
	}
}

document.getElementById("asap").onclick = function() {
	if(!document.getElementById("specificDate").checked) {
		document.getElementById("releaseDateText").style.display = "none";
		document.getElementById("specificReleaseDate").style.display = "none";
	}
}

document.getElementById("file-upload-button").onclick = function() {
	document.getElementById("file").click();
}

document.getElementById("beat-licence-upload-button").onclick = function() {
	document.getElementById("beat-licence").click();
}

document.getElementById("beat-proof-upload-button").onclick = function() {
	document.getElementById("beat-proof").click();
}

document.getElementById("album-art-upload-button").onclick = function() {
	document.getElementById("albumArt").click();
}

document.getElementById("albumArt").onchange = function() {
	document.getElementById("album-art-upload-name").innerHTML = document.getElementById("albumArt").files[0].name;
}

var form = document.getElementById("release-form");
var trackName = document.getElementById("songName").value;

document.getElementById("submit-redirect").onclick = function() {
	var r = [];
	var allFinished = true;
	for(var i = 0;i<tracks.length;i++) {
		if(!tracks[i].checkRequired()) {
			allFinished = false;
			r.push(i+1);
		}
	}
	if(!allFinished) {
		window.scrollTo(0,0);
		if(r.length > 1) {
			var neededTracks = r.slice(0,-1).join(", ") + " and "+ r.slice(-1);
			var m = "You still have not completed all required fields on tracks ";
		} else {
			var neededTracks = r;
			var m = "You still have not completed all required fields on track ";
		}
		document.getElementById("unfinishedTracks").style.display = "block";
		document.getElementById("unfinishedTracks").innerHTML = m + neededTracks;
	}
	if(allFinished) {
		document.getElementById("release-submit").click();
	}
}

var albumInfo = {
	albumName: "",
	cprOwner: "",
	mastering: null,
	asapRadio: false,
	specRadio: false,
	releaseDate: null,
	file: null,
};

document.getElementById("album-info-form").onchange = function() {
	albumInfo.albumName = document.getElementById("releaseName").value;
	albumInfo.cprOwner = document.getElementById("copyrightOwner").value;
	albumInfo.mastering = document.getElementById("master").checked;
	albumInfo.asapRadio = document.getElementById("asap").checked;
	albumInfo.specRadio = document.getElementById("specificDate").checked;
	if(albumInfo.asapRadio && !albumInfo.specRadio) {
		albumInfo.releaseDate = "asap";
	} else if(!albumInfo.asapRadio && albumInfo.specRadio) {
		albumInfo.releaseDate = document.getElementById("specificReleaseDate").value;
	}
	if(document.getElementById("albumArt").files[0] != null) {
		albumInfo.file = document.getElementById("albumArt").files[0];
	}
}

form.onsubmit = function(event) {
	event.preventDefault();


	//the for loop iterates through the array of Track instances (track is a class) in the tracks array
	//for each track it makes a "formData" variable, uploading the song file
	//then it appends all of the song information stored in instance variables to the form data
	//it finally sends the formData as a POST http request, this acts the same as an HTML form submit
	var albumXHR = new XMLHttpRequest();
	albumXHR.open('POST', 'album-info-upload.php', true);
	var albumData = new FormData();
	albumData.append("albumName", albumInfo.albumName);
	albumData.append("cprOwner", albumInfo.cprOwner);
	albumData.append("albumArt", albumInfo.file);
	albumData.append("mastering", albumInfo.mastering);
	albumData.append("releaseDate", albumInfo.releaseDate);
	albumData.append("artistName", firebase.auth().currentUser.artistName);
	albumXHR.send(albumData);

	var i = 0;
	for(i = 0;i<tracks.length;i++) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'song-info-upload.php', true);
		var formData = new FormData();
		formData.append("albumName", albumInfo.albumName);
		formData.append("artistName", firebase.auth().currentUser.artistName);
		formData.append("fileToUpload", tracks[i].file, tracks[i].fileName);				//
		formData.append("trackName", tracks[i].songName);									//
		formData.append("genre", tracks[i].genre);											//
		formData.append("subgenre", tracks[i].subgenre);									//
		formData.append("primary", tracks[i].primaryArtists);								//
		formData.append("feat", tracks[i].featuredArtists);									//
		formData.append("isrcCode", tracks[i].isrc);										//
		formData.append("explicit", tracks[i].explicitContent);								//
		formData.append("producers", tracks[i].producers);									//
		formData.append("previewStart", tracks[i].previewStartTime);						//
		formData.append("language", tracks[i].language);									//
		formData.append("songwriter", tracks[i].songWriterName)								//
		formData.append("prevRelease", tracks[i].prevRelease)								//

		formData.append("beatLicence", tracks[i].beatLicence, tracks[i].beatLicenceName)	//
		formData.append("beatProof", tracks[i].beatProof, tracks[i].beatProofName)			//
		for(var key in tracks[i].contributors) {
			formData.append(key, tracks[i].contributors[key]);								//
		}
		xhr.send(formData);
	}
}