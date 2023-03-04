<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
include('conexionbd.php');
$tags = $_POST['iTag'];
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else {
    $query = "INSERT INTO `tags` (`taGname`) VALUES ('$tags')";
    $resultado = mysqli_query($connect, $query);
    echo "Registro grabado correctamente " . $query;
    $connect->close();
}
 