<?php
header('Access-Control-Allow-Origin: *'); 
header('Access-Control-Allow-Headers: Content-Type');
include('conexionbd.php');
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
    $query = "INSERT INTO `posts` (`title`, `content`, `author`, `post_date`, `category_id`, `tag_id`, `file`) VALUES ('$title', '$content', '$author', '$post_date', '$category_id', '$tag_id', '$file')";
    $resultado = mysqli_query($connect, $query);
    echo "Registro grabado correctamente " . $query;
    $connect->close();
}
