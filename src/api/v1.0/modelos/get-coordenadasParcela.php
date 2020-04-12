<?php
session_start();
$id_cliente = $_SESSION['usuario']['id_cliente'];
$consulta="SELECT p.id_parcela as id_parcela, p.nombre as nombre, c.id_coordenada, c.latitud, c.longitud
	FROM parcela p 
    INNER JOIN coordenadas c
    	ON c.id_parcela = p.id_parcela
    INNER JOIN campo
    	ON p.id_campo = campo.id_campo
    WHERE campo.id_cliente = '$id_cliente'";

$res=mysqli_query($conexion,$consulta);

if($res==true){
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    $http_code= 200;
}else{
    $http_code= 400;
}

