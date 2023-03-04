<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionbd.php');

//Recibe el array con los datos JSON.
$id = $_POST['Id'];

//Si hay error en la conexión.
if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
//Si no hay error en la conexión.
} else {
    //Consulta de actualización en la base de datos.
    $query = "DELETE FROM categories where id= ". $id;

    //Si la consulta se ha realizado correctamente.
	if(mysqli_query($connect,$query)){
       	echo "Registro borrado correctamente.";
	//Si la consulta no se ha realizado correctamente.
    }else{
		echo "Error al borrar el registro.";
	}
    $connect->close();
} 