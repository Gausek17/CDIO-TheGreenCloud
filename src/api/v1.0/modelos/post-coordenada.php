<?php
session_start();


$id_parcela = $_POST['id_parcela'];
$lat = floatval($_POST['lat']);
$lng = floatval($_POST['lng']);

$sql = "INSERT INTO coordenadas (`id_coordenada`,`latitud`, `longitud`, `id_parcela`)
            VALUES (NULL,'$lat', '$lng', '$id_parcela')";


$res = mysqli_query($conexion, $sql);
if ($res == true) {
    $http_code = 200;
} else {
    $http_code = 400;
}
