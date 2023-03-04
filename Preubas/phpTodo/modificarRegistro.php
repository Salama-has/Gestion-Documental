<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
include('conexionbd.php');

$id = $_POST['iId'];
$title = $_POST['iTitulo'];
$author = $_POST['iAutor'];
$category_id = $_POST['iCategoria'];
$post_date = $_POST['iFecha'];
$tag_id = $_POST['iTag'];
$content = $_POST['iContenido'];
$file = basename($_FILES['ifile']['name']);

if ($connect->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
} else {
    $query = "UPDATE posts SET `title` = '$title', 
    `content` = '$content', 
    `author` = $author, 
    `post_date` = '$post_date', 
    `tag_id` = $tag_id,  
    `category_id` = $category_id, 
    `file` = '$file'
    WHERE `id` = $id";

    if(mysqli_query($connect, $query)) {
        echo "Registro modificado correctamente." . $query;
    } else {
        echo "Error al modificar el registro." . $query;
    }
    $connect->close();
}
?>



