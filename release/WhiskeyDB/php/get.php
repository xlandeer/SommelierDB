<?php
    //Get Connection

    function executeQuery($conn, $sql) {
        if (mysqli_query($conn, $sql)) {
            echo "New record created successfully";
        } else { 	
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
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

    //GET REQUEST

    if($_SERVER['REQUEST_METHOD'] === 'GET'  && isset($_GET['searchFilter']) && isset($_GET['attribute']))	{
        $results = [];
		$attr_prefix = "";
		switch ($_GET['attribute']) {
			case 'name':
			case 'distillery':
			case 'origin_country':
			case 'years_aged':
			case 'type':
			case 'alc_perc':
				$attr_prefix = "wd.";
				break;
			case 'nose':
				$attr_prefix = "wnn.";
				break;
			case 'taste':
			case 'author':
				$attr_prefix = "wnt.";
				break;
			
		}
		$attr = $attr_prefix . $_GET['attribute'];

        $sql = 'SELECT DISTINCT wd.* FROM whiskey_data wd  ';
		$sql .= 'LEFT JOIN whiskey_note_taste wnt ON wd.id = wnt.whiskey_id ';
		$sql .= 'LEFT JOIN whiskey_note_nose wnn ON wd.id = wnn.whiskey_id ';
		$sql .= 'WHERE '.$attr.' LIKE "%'.$_GET["searchFilter"].'%";';

		$searchRes = mysqli_query($conn, $sql);
		
		if ($searchRes->num_rows > 0) {
			
			while($row = $searchRes->fetch_assoc()) {
				$id = (int)$row['id'];
				$tasteNoteRes = [];
                $sql = "SELECT note FROM whiskey_note_taste WHERE whiskey_id = $id";
                $tasteSearchRes = mysqli_query($conn, $sql);
				
                if ($tasteSearchRes->num_rows > 0) {
                    while($rowTaste = $tasteSearchRes->fetch_assoc()) {
                        $rowResTaste = $rowTaste["note"];
                        array_push($tasteNoteRes, $rowResTaste);
                    }
				}

				$noseNoteRes = [];
				$sql = "SELECT note FROM whiskey_note_nose WHERE whiskey_id = $id";
                $noseSearchRes = mysqli_query($conn, $sql);
				
                if ($noseSearchRes->num_rows > 0) {
                    while($rowNose = $noseSearchRes->fetch_assoc()) {
                        $rowResNose = $rowNose["note"];
                        array_push($noseNoteRes, $rowResNose);
                    }
				}
				$rowRes = ['imageUrl' => $row["image_url"], 'name' => $row["name"], 'distillery' => $row["distillery"],'originCountry' => $row["origin_country"],'yearsAged' => $row["years_aged"],'type' => $row["type"],'alcPerc' => $row["alc_perc"],'author' => $row["author"],'tasteNotes' => $tasteNoteRes,'noseNotes' => $noseNoteRes, 'id' => $id];
				array_push($results, $rowRes);
			}
			echo(json_encode($results));
		}
		
        
	}else {
        
		http_response_code(405); 
		die();
    }
?>