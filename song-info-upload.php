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

	<div id="main-grid">
		<?php
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
			fwrite($info_file, "\n");
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

	</div>
</body>
</html>