<?php


$sql = "SELECT * FROM permisos_usuarios";

$res = mysqli_query($conexion, $sql);

if($res==true){
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    $http_code= 200;
}else{
    $http_code= 400;
}

