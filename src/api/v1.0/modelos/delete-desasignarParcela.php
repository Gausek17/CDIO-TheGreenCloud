<?php
//Los datos enviados en peticiones PUT / DELETE deben ser enviados en objetos JSON (pasados a String, mediante Stringify)
$datosRecibidos = (array) json_decode(file_get_contents('php://input'));
$id_usuario =$datosRecibidos['id_usuario'];
$id_parcela=$datosRecibidos['id_parcela'];
$sql = "DELETE FROM permisos_usuarios WHERE id_usuario='$id_usuario' and id_parcela='$id_parcela'";
$res = mysqli_query($conexion, $sql);
if ($res == true) {
    $http_code = 200;
} else {
    $http_code = 400;
}

