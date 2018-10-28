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
	el("contributorName").value = contributorNameArray[el("contributorTitle").value];
}

el("contributorName").onchange = function() {
	contributorNameArray[el("contributorTitle").value] = el("contributorName").value;
}

var contributorTitleArray = ["Actor","Arranger","Choir","Composer","Conductor","Engineer","Ensamble","Lyricist","Mixer","Orchestra","Remixer","Soloist"];
var contributorNameArray = ["","","","","","","","","","","",""];

// var Actor = "";
// var Arranger = "";
// var Choir = "";
// var Composer = "";
// var Conductor = "";
// var Engineer = "";
// var Ensamble = "";
// var Lyricist = "";
// var Mixer = "";
// var Orchestra = "";
// var Remixer = "";
// var Soloist = "";

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

el("language").onchange = function() {
	if(el("language").value == "other") {
		el("otherLangDiv").style.display = "inline";
		el("language").style.marginBottom = "5px";
	} else {
		el("otherLangDiv").style.display = "none";
		el("language").style.marginBottom = "0px";
	}
}