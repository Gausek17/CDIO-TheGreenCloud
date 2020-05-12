<?php

if (isset($_POST['id_usuario']) && isset($_POST['id_parcela'])) {
    $id_usuario = $_POST['id_usuario'];
    $id_parcela = $_POST['id_parcela'];
    $sql = "INSERT INTO permisos_usuarios (`id_permiso`,`id_usuario`, `id_parcela`)
            VALUES (NULL,'$id_usuario','$id_parcela')";
    $res = mysqli_query($conexion, $sql);
    if ($res == true) {
        $http_code = 200;
    } else {
        $http_code = 400;
    }
}else{
    $http_code=400;
}






