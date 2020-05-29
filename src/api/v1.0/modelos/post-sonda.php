<?php
session_start();
if ($id == 0) {

    $id_parcela = $_POST['id_parcela'];
    $lat = floatval($_POST['lat']);
    $lng = floatval($_POST['lng']);
    $nombre = $_POST['nombre'];
    $sql = "INSERT INTO sonda (`id_sonda`,`estado`, `id_parcela`, `lat`, `lng`, `nombre`)
            VALUES (NULL,'Funcional', '$id_parcela', '$lat', '$lng', '$nombre')";

} else {
    $lat = floatval($_POST['lat']);
    $lng = floatval($_POST['lng']);
    $nombre = $_POST['nombre'];
    $sql = "UPDATE sonda SET nombre='$nombre', lat='$lat' , lng = '$lng' WHERE id_sonda='$id'";
}


$res = mysqli_query($conexion, $sql);
if ($res == true) {
    $http_code = 200;
} else {
    $http_code = 400;
}
