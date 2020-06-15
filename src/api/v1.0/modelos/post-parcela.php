<?php
//session_start();
if ($id == 0) {
    //if (isset($_SESSION['registrado'])){
    $nombre = $_POST['nombre'];
    $color = $_POST['color'];
    $sql = "INSERT INTO parcela (`id_parcela`,`nombre`, `color`, `id_campo`)
            VALUES (NULL,'$nombre', '$color', 1)";
    //}
    $res = mysqli_query($conexion, $sql);
    $id = mysqli_insert_id($conexion);
    $listaCoord = json_decode($_POST['coordenadas']);
    var_dump($listaCoord);
    foreach ($listaCoord as $coord) {
        $id_parcela = $id;
        $lat = floatval($coord->lat);
        $lng = floatval($coord->lng);

        $sql = "INSERT INTO coordenadas (`id_coordenada`,`latitud`, `longitud`, `id_parcela`)
            VALUES (NULL,'$lat', '$lng', '$id_parcela')";
        $res = mysqli_query($conexion, $sql);
    }
    $id_usuario = 1;
    $id_parcela = $id;
    $sql = "INSERT INTO permisos_usuarios (`id_permiso`,`id_usuario`, `id_parcela`)
            VALUES (NULL,'$id_usuario','$id_parcela')";
    $res = mysqli_query($conexion, $sql);

} else {

    $nombre = $_POST['nombre'];
    $color = $_POST['color'];

    $sql = "UPDATE parcela SET nombre='$nombre', color='$color' WHERE id_parcela='$id'";
    $res = mysqli_query($conexion, $sql);
}


if ($res == true) {
    $http_code = 200;
} else {
    $http_code = 400;
}
