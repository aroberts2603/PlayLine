function el(ele) {
	return document.getElementById(ele);
}

document.getElementById("isrcYes").onclick = function() {
	document.getElementById("isrcBR").style.display = "inline";
	document.getElementById("isrcC").style.display = "inline";
	document.getElementById("isrc").style.display = "inline";
}

document.getElementById("isrcNo").onclick = function() {
	document.getElementById("isrcBR").style.display = "none";
	document.getElementById("isrcC").style.display = "none";
	document.getElementById("isrc").style.display = "none";
}

document.getElementById("releasedBeforeYes").onclick = function() {
	document.getElementById("releasedBeforeDateDiv").style.display = "inline";
}

document.getElementById("releasedBeforeNo").onclick = function() {
	document.getElementById("releasedBeforeDateDiv").style.display = "none";
}

document.getElementById("releaseDateASAP").onclick = function() {
	document.getElementById("specificReleaseDateDiv").style.display = "none";
}

document.getElementById("releaseDateSpecific").onclick = function() {
	document.getElementById("specificReleaseDateDiv").style.display = "inline";
}

el("language").onchange = function() {
	if(el("language").value == "other") {
		el("otherLangDiv").style.display = "inline";
	} else {
		el("otherLangDiv").style.display = "none";
	}
}