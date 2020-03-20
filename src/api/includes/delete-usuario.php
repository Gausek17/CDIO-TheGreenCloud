<?php
require_once '../../includes/conexion.php';

// sql to delete a record
$sql = 'DELETE FROM `usuario` WHERE `id_usuario` = '.$_GET["id"];

if (mysqli_query($conexion, $sql)) {
    http_response_code(200);
} else {
    http_response_code(400);
    echo "Error deleting record: " . mysqli_error($conexion);
}

 
?>