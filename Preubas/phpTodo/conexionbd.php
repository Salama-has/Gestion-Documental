<?php
$host_name = 'localhost';
$database = 's022045b_DocMag';
$user_name = "s022045b_salamaDM";
$password = "2EBEdrY8cY6vtbY"; 

//Conexi贸n a la base da datos.
$connect = mysqli_connect($host_name, $user_name, $password, $database);
//Si existe un error al conectar con la base de datos.
if (mysqli_connect_errno()) {
    echo '<p>"Error: Fallo al conectarse a MySQL debido a: ' .
        mysqli_connect_error() .
        '</p>';
}
?>