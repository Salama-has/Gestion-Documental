<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionbd.php');
$contenido=$_POST['Envio'];
 

$contenido=$_POST['Envio'];
$contenido= str_replace("\\","", $contenido);
$array=explode(",",$contenido);
 
$condicion=$array[0]; 

$sql = "SELECT * FROM categories ";

$resultado = mysqli_query($connect, $sql);

while ($row = mysqli_fetch_assoc($resultado)) {

    $output[] = $row;

}

print(json_encode($output));

$connect->close();

?>