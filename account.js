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