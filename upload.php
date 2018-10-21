<html>
<head>
	<meta http-equiv="pragma" content="no-cache" charset="utf-8">
	<title>PlayLine Dash</title>
	<link rel="icon" href="imgs/playlineicon.ico">
	<link href="https://fonts.googleapis.com/css?family=Roboto:400" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div id="navbar">
		<div class="third" style="width: 33%;"><img src="imgs/hamburger.png" id="menu-button"></div>
		<div class="third" style="width: 33%;"><img src="imgs/playline.png" id="navbar-logo"></div>
		<div class="third" style="width: 33%;"><a id="open-login">Log In</a></div>
		<div id="dropdown" style="margin-left: -279px;">
			<img src="imgs/X.png" id="menu-button2">
			<hr id="dropdownhr">
			<table id="table-menu">
				<tr><td class="menu-item"><p class="menu-item-p"><a id="home-link">Home</a></p></td></tr>
				<tr><td class="menu-item"><p class="menu-item-p"><a id="artists-link" href="http:/localhost//index2.html">Artists</a></p></td></tr>
				<tr><td class="menu-item"><p class="menu-item-p"><a id="about-link">About</a></p></td></tr>
				<tr><td class="menu-item"><p class="menu-item-p"><a id="dash-link"style="visibility: hidden;">Dashboard</a></p></td></tr>
			</table>
		</div>

		<div id="login-form" class="login-form">
			<div class="top-container" id="top-container">
				<p class="top-form-text" id="top-login-form-text">Log In With Email</p>
				<img class="close-form" id="close-login-form" src="imgs/X.png">
			</div>
			<form>
				<input type="text" id="email" class="textbox" placeholder="Email"><br>
				<input type="text" id="password" class="textbox" placeholder="Password"><br>
				<button type="button" id="login">Log In</button><br>
			</form>
			<p id="signup-text2">Don"t have an account? <a id="signup" class="alink">Sign Up</a></p>
		</div>

		<div id="signup-form" class="signup-form">
			<div class="top-container" id="top-container-signup">
				<p class="top-form-text" id="top-signup-form-text">Sign Up With Email</p>
				<img class="close-form" id="close-signup-form" src="imgs/X.png">
			</div>
			<form>
				<input id="newEmail" type="text" class="textbox" name="email" placeholder="Email"><br>
				<input id="newPassword" type="text" class="textbox" name="password" placeholder="Password"><br>
				<input id="first" type="text" class="textbox" name="first" placeholder="First Name"><br>
				<input id="last" type="text" class="textbox" name="last" placeholder="Last Name"><br>
				<button type="button" id="signupButton" name="login">Sign Up</button><br>
			</form>
			<p id="signup-text">Already have an account? <a id="alreadyHaveAcc" class="alink">Log In</a></p>
		</div>
	</div>

	<div id="graystuff" style="display: none;"></div>

	<?php

		if(file_exists("uploads/" . $_POST["primary"]) == false) {
			mkdir("uploads/" . $_POST["primary"]);
		}
		if(file_exists("uploads/" . $_POST["primary"] . "/" . $_POST["songName"]) == false) {
			mkdir("uploads/" . $_POST["primary"] . "/" . $_POST["songName"]);
		}
		$target_dir = "uploads/" . $_POST["primary"] . "/" . $_POST["songName"] . "/";
		$target_file = $target_dir . $_POST["songName"];
		$ending = explode(".", $_FILES["fileToUpload"]["name"]);
		if(move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file . "." . end($ending))) {
			$uploadStat = "Song uploaded successfully.";
		} else {
			$uploadStat = "Song not uploaded successfully, try again.";
		}
		$info_file = fopen($target_file . ".txt", "w");
		fwrite($info_file, "Primary Artist: " . $_POST["primary"] . "\n");
		fwrite($info_file, "Featured Artists: " . $_POST["feat"] . "\n");
		fwrite($info_file, "Genre: " . $_POST["genre"] . "\n");
		fwrite($info_file, "Subgenre: " . $_POST["subgenre"] . "\n");
		if($_POST["isrcBool"] == "no") {
			$isrc = "no-isrc";
		} else {
			$isrc = $_POST["isrcCode"];
		}
		fwrite($info_file, "ISRC: " . $isrc . "\n");
		fwrite($info_file, "Explicit: " . $_POST["explicit"] . "\n");
		if($_POST["language"] == "other") {
			$lang = $_POST["otherLang"];
		} else {
			$lang = $_POST["language"];
		}
		fwrite($info_file, "Lyrics: " . $lang . "\n");
		fwrite($info_file, "Copyright Owner: " . $_POST["cpOwner"] . "\n");
		if($_POST["releasedBefore"] == "no") {
			$releasedB4 = "not-released-before";
		} else {
			$releasedB4 = $_POST["releasedBeforeDate"];
		}
		fwrite($info_file, "Released Before: " . $releasedB4 . "(formatted yyyy-mm-dd)" . "\n");
		if($_POST["releaseDate"] == "asap(2-4 days)") {
			$releaseDate = "asap(2-4 days)";
		} else {
			$releaseDate = $_POST["specificReleaseDate"];
		}
		fwrite($info_file, "Release Date: " . $releaseDate . "\n");
		fclose($info_file);
		echo $uploadStat;

	?>

	<div id="footer">
		<img src="imgs/playline.png" style="height: 50px; width: 50px;">
		<p id="cpr1">© 2018 PlayLine Records, All rights reserved.</p>
		<p id="cpr2">Apple and Apple Music are trademarks of Apple Inc., registered in the U.S. and other countries</p>
	</div>
<script src="https://www.gstatic.com/firebasejs/5.5.1/firebase.js"></script>
<script type="text/javascript" src="navbar.js"></script>
</body>
</html>
