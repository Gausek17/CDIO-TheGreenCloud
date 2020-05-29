<?php
session_start();
$idCliente = $_SESSION['usuario']['id_cliente'];
$sql = "SELECT * FROM parcela WHERE id_campo = 1";

$res = mysqli_query($conexion, $sql);

if($res==true){
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    $http_code= 200;
}else{
    $http_code= 400;
}
