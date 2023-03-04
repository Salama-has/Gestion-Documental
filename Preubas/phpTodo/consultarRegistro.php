<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionbd.php');
$contenido=$_POST['Envio'];

if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else{
    $sql = "SELECT posts.id ,posts.title ,tags.taGname , posts.post_date ,authors.authorname,posts.content ,categories.id ,posts.file FROM posts 
    INNER join authors on posts.author=authors.id 
    INNER join tags on posts.tag_id=tags.id 
    INNER join categories on posts.category_id=categories.id
    ". $contenido . " LIMIT 1 ";
    //Realiza la consulta contra la base de datos.
    $resultado = mysqli_query($connect, $sql);
    //Busca el pr贸ximo registro de un conjunto de resultados como un array asociativo.
    while ($row = mysqli_fetch_assoc($resultado)) {
        $output[] = $row;
    }
    //Retorna la representaci贸n JSON de los datos de la consulta.
    print(json_encode($output));
    //Cierra la conexi贸n a la base de datos.
    $connect->close();
}
?>