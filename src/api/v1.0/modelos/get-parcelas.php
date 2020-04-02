<?php
session_start();
$id = $_SESSION['usuario']['id_usuario'];
$consulta="SELECT p.id_parcela as id_parcela, p.color as color, p.id_campo as id_campo, p.nombre as nombre, pu.id_usuario 
	FROM permisos_usuarios pu 
    INNER JOIN parcela p 
    	on p.id_parcela = pu.id_parcela";

$res=mysqli_query($conexion,$consulta);

if($res==true){
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    $http_code= 200;
}else{
    $http_code= 400;
}
