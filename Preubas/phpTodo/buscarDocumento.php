<?php
// get search term and search type from user input
$searchTerm = $_POST['searchTerm'];
$searchType = $_POST['searchType'];

// connect to database and check for errors
include('conexionbd.php');
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else {
    // build query string based on search type
    if ($searchType === 'title') {
        $query = "SELECT * FROM posts WHERE `title` LIKE '%$searchTerm%'";
    } else {
        $query = "SELECT * FROM posts WHERE `content` LIKE '%$searchTerm%'";
    }

    // execute query and check for errors
    $result = mysqli_query($connect, $query);
    if (!$result) {
        echo "Error al realizar la búsqueda.";
    } else {
        // display search results
        while ($row = mysqli_fetch_assoc($result)) {
            // output search results
        }
    }

    // close database connection
    $connect->close();
}
?>
