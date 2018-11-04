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

el("language").onchange = function() {
	if(el("language").value == "other") {
		el("otherLangDiv").style.display = "inline";
		el("language").style.marginBottom = "5px";
	} else {
		el("otherLangDiv").style.display = "none";
		el("language").style.marginBottom = "0px";
	}
}