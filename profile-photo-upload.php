<?php
	if(file_exists("users/" . $_POST["uid"]) == false) {
		mkdir("users/" . $_POST["uid"]);
	}

	$target_dir = "users/" . $_POST["uid"];

	$ending = explode(".", $_FILES["profilePhoto"]["name"]);
	move_uploaded_file($_FILES["profilePhoto"]["tmp_name"], $target_dir . "/profilePhoto" . "." . end($ending));
?>