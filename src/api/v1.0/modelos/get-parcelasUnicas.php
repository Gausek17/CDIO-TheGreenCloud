<?php
session_start();
$idCliente = $_SESSION['usuario']['id_cliente'];
$sql = "SELECT p.id_parcela, p.nombre FROM parcela p
	INNER JOIN permisos_usuarios pu
    on p.id_parcela = pu.id_parcela
    INNER JOIN usuario u
    on u.id_usuario = pu.id_usuario
    WHERE u.id_cliente =".$idCliente.
    " GROUP by id_parcela";

$res = mysqli_query($conexion, $sql);

if($res==true){
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    $http_code= 200;
}else{
    $http_code= 400;
}
