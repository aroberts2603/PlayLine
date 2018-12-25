<html>
<head>
	<meta http-equiv="pragma" content="no-cache" charset="utf-8">
	<title>PlayLine Records</title>
	<link rel="icon" href="imgs/PlayLineCoral.png">
	<link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="global.css">
	<meta name="viewport" content="width=device-width">
</head>
<body id="home">
	<div id="navbar">
		<div>
			<img src="imgs/PlayLineCoral.png" id="navbar-logo">
			<p id="navbar-logo-text">PLAYLINE</p>
		</div>
		<div></div>
		<div id="navbar-links">
			<p class="navbar-p"><a href="index.html">Home</a></p>
			<p class="navbar-p"><a href="artists.html">Artists</a></p>
			<p class="navbar-p"><a href="about.html">About</a></p>
			<div class="open-auth-form" id="open-login-form">Log In</div>
			<div class="open-auth-form" id="open-signup-form">Sign Up</div>
			
			<div style="display: none;" id="profile-photo"></div>

			<div style="display: none;" id="dropdown-arrow-container">
				<svg version="1.1" id="dropdown-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style="enable-background:new 0 0 1000 1000;" xml:space="preserve">
					<polygon id="dropdown-arrow-poly" points="0,250 1000,250 500,750 "/>
				</svg>
			</div>
			
			<div style="display: none;" id="account-dropdown">
				<p style="margin-top: 20px;"><a class="account-dropdown-links" href="dash.html">Dashboard</a><br></p>
				<p><a class="account-dropdown-links">Account Settings</a><br></p>
				<p id="logout"><a class="account-dropdown-links">Log Out</a></p>
			</div>
		</div>
	</div>
	<div  id="mobile-navbar">
		<div id="menu-button">
			<div class="third-of-hamburger" id="third-of-hamburger1"></div>
			<div class="third-of-hamburger" id="third-of-hamburger2"></div>
			<div class="third-of-hamburger" id="third-of-hamburger3"></div>
		</div>

		<div id="dropdown" style="margin-left: -279px;">
			<table id="table-menu">
				<tr><td class="menu-item"><p class="menu-item-p"><a id="home-link">Home</a></p></td></tr>
				<tr><td class="menu-item"><p class="menu-item-p"><a id="artists-link" href="http:/localhost//index2.html">Artists</a></p></td></tr>
				<tr><td class="menu-item"><p class="menu-item-p"><a id="about-link">About</a></p></td></tr>
				<tr><td class="menu-item"><p class="menu-item-p"><a id="dash-link"style="visibility: hidden;">Dashboard</a></p></td></tr>
			</table>
		</div>
	</div>

	<div id="login-form" class="auth-form" style="top: -290px;">
			<p class="top-form-text" id="top-login-form-text">Log In With Email</p>
			<div>
				<svg version="1.1" class="close-auth-form" id="close-login-form" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 864 864" style="enable-background:new 0 0 864 864;" xml:space="preserve">
					<polygon points="0,107.43 110.04,0 432,324 756.16,0 864,107.56 540,432 864,756.11 756.16,864 432,540 105.67,864 0,746.4 324,432 "/>
				</svg>
			</div>

			<form>
				<input type="text" id="email" class="textbox" placeholder="Email"><br>
				<input type="text" id="password" class="textbox" placeholder="Password"><br>
				<button type="button" id="login-button">Log In</button><br>
			</form>

			<p class="bottom-auth-text">Don't have an account? <a id="switch-to-signup" class="alink" style="cursor: pointer;">Sign Up</a></p>
		</div>

		<div id="signup-form" class="auth-form" style="top: -290px;">
			<p class="top-form-text" id="top-signup-form-text">Sign Up With Email</p>
			<div>
				<svg version="1.1" class="close-auth-form" id="close-signup-form" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 864 864" style="enable-background:new 0 0 864 864;" xml:space="preserve">
					<polygon points="0,107.43 110.04,0 432,324 756.16,0 864,107.56 540,432 864,756.11 756.16,864 432,540 105.67,864 0,746.4 324,432 "/>
				</svg>
			</div>

			<form>
				<input id="newEmail" type="text" class="textbox" name="email" placeholder="Email"><br>
				<input id="newPassword" type="text" class="textbox" name="password" placeholder="Password"><br>
				<input id="first" type="text" class="textbox" name="first" placeholder="First Name"><br>
				<input id="last" type="text" class="textbox" name="last" placeholder="Last Name"><br>
				<button type="button" id="signup-button">Sign Up</button><br>
			</form>

			<p class="bottom-auth-text">Already have an account? <a id="switch-to-login" class="alink" style="cursor: pointer;">Log In</a></p>
		</div>
	</div>

	<div style="height: 50px;" id="navbar-fill"></div>

	<div id="graystuff" style="display: none;"></div>

	<div id="main-grid">
		<?php

			echo "yikes";

			echo $_POST["trackName"];

			if(file_exists("uploads/" . $_POST["artistName"]) == false) {
				mkdir("uploads/" . $_POST["artistName"]);
			}

			if(file_exists("uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"]) == false) {
				mkdir("uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"]);
			}

			if(file_exists("uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"] . "/" . $_POST["trackName"]) == false) {
				mkdir("uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"] . "/" . $_POST["trackName"]);
			}

			$target_dir = "uploads/" . $_POST["artistName"] . "/" . $_POST["albumName"] . "/" . $_POST["trackName"] . "/";
			$target_file = $target_dir . $_POST["trackName"];
			$ending = explode(".", $_FILES["fileToUpload"]["name"]);
			move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file . "." . end($ending));

			$ending = explode(".", $_FILES["beatLicence"]["name"]);
			move_uploaded_file($_FILES["beatLicence"]["tmp_name"], $target_dir . "beat_licence" . "." . end($ending));

			$ending = explode(".", $_FILES["beatProof"]["name"]);
			move_uploaded_file($_FILES["beatProof"]["tmp_name"], $target_dir . "beat_proof" . "." . end($ending));

			$info_file = fopen($target_file . ".txt", "w");
			fwrite($info_file, "Track Name: " . $_POST["trackName"] . "\n");
			fwrite($info_file, "Primary Artist: " . $_POST["primary"] . "\n");
			fwrite($info_file, "Featured Artists: " . $_POST["feat"] . "\n");
			fwrite($info_file, "Genre: " . $_POST["genre"] . "\n");
			fwrite($info_file, "Subgenre: " . $_POST["subgenre"] . "\n");
			fwrite($info_file, "ISRC: " . $_POST["isrcCode"] . "\n");
			fwrite($info_file, "Explicit: " . $_POST["explicit"] . "\n");
			fwrite($info_file, "Producers: " . $_POST["producers"] . "\n");
			fwrite($info_file, "Preview Start: " . $_POST["previewStart"] . "\n");
			fwrite($info_file, "Lyrics: " . $_POST["language"] . "\n");
			fwrite($info_file, "Songwriter Name: " . $_POST["songwriter"] . "\n");
			fwrite($info_file, "Previous Release: " . $_POST["prevRelease"] . " yyyy-mm-dd" . "\n");

			fwrite($info_file, "\n" . "vvv Contributors vvv" . "\n");
			fwrite($info_file, "Actor: " . $_POST["Actor"] . "\n");
			fwrite($info_file, "Arranger: " . $_POST["Arranger"] . "\n");
			fwrite($info_file, "Choir: " . $_POST["Choir"] . "\n");
			fwrite($info_file, "Composer: " . $_POST["Composer"] . "\n");
			fwrite($info_file, "Conductor: " . $_POST["Conductor"] . "\n");
			fwrite($info_file, "Engineer: " . $_POST["Engineer"] . "\n");
			fwrite($info_file, "Ensemble: " . $_POST["Ensemble"] . "\n");
			fwrite($info_file, "Lyricist: " . $_POST["Lyricist"] . "\n");
			fwrite($info_file, "Mixer: " . $_POST["Mixer"] . "\n");
			fwrite($info_file, "Orchestra: " . $_POST["Orchestra"] . "\n");
			fwrite($info_file, "Remixer: " . $_POST["Remixer"] . "\n");
			fwrite($info_file, "Soloist: " . $_POST["Soloist"] . "\n");

			fclose($info_file);

		?>		

		<div id="footer">
			<div></div>
			<div>
				<img src="imgs/PlayLineCoral.png" style="height: 50px; width: 50px; margin-right: 30px;">
			</div>
			<div style="margin-top: 15px;">
				<p style="color: white;" id="cpr1">© 2018 PlayLine Records, All rights reserved.</p>
				<p style="color: white;" id="cpr2">Apple and Apple Music are trademarks of Apple Inc., registered in the U.S. and other countries</p>
			</div>
			<div></div>
		</div>
	</div>
<script src="https://www.gstatic.com/firebasejs/5.5.1/firebase.js"></script>
</body>
</html>