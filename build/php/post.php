<?php

    //Get Connection

    function executeQuery($conn, $sql) {
        if (mysqli_query($conn, $sql)) {
            return "New record created successfully";
        } else { 	
            return "Error: " . $sql . "<br>" . mysqli_error($conn);
        }
    }
	// function to reate a connection to databse
	function connToDB($servername, $username, $password, $dbname) {
		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if (!$conn) {
			//die("Connection failed: " . mysqli_connect_error(). "<br>");
			return false;
		}else {
			// return connection if connection is created
			return $conn;
		}
    }

    $sname = "127.0.0.1";
	$uname = "root";
	$pswd = "";
	$dbname = "Whiskey";

    $conn = connToDB($sname, $uname, $pswd, $dbname);

    //POST REQUEST

	if ( $_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST)) {
		if($_POST["intention"] == "save") {
			$whiskeyName = $_POST["name"];
			$imageUrl = $_POST["imageUrl"];
			$name= $_POST["name"];
			$distillery= $_POST["distillery"];
			$origin_country= $_POST["origin_country"];
			$years_aged= $_POST["years_aged"];
			$type= $_POST["type"];
			$alc_perc= $_POST["alc_perc"];
			$nose_notes= $_POST["nose_notes"];
			$taste_notes= $_POST["taste_notes"];
			$author= $_POST["author"];


			
			

			$sql = "INSERT INTO whiskey_data(image_url, name, distillery, origin_country, years_aged, type, alc_perc, author)";
			$sql .= "VALUES('$imageUrl','$whiskeyName','$distillery','$origin_country',$years_aged,'$type','$alc_perc', '$author');";
			executeQuery($conn, $sql);

			$sql = "SELECT MAX(id) AS ID FROM whiskey_data";
			$id = (int)mysqli_query($conn, $sql)->fetch_assoc()["ID"];

		
			
			foreach ($taste_notes as $note) {
				$sql = "INSERT INTO whiskey_note_taste(whiskey_id, note)";
				$sql .= "Values($id, '$note')";
				executeQuery($conn, $sql);
			}
			foreach ($nose_notes as $note) {
				$sql = "INSERT INTO whiskey_note_nose(whiskey_id, note)";
				$sql .= "Values($id, '$note')";
				executeQuery($conn, $sql);
			}
		}else {
			$id = $_POST['id'];
			$sql = "DELETE FROM whiskey_data WHERE id = $id";
			echo $_POST['imgPath'];
			unlink($_POST['imgPath']);
			executeQuery($conn, $sql);
		}

	} else {
        echo 'Please use the affiliated Script for the HTTP Method!';
        http_response_code(405); 
		die();
    }
?>