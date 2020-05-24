<?php
//ESTAMOS EN LOCAL
$server = 0;


//ESTMOS EN SERVIDOR
//$server = 1;


/*Configuración local*/
if ($server==0){
    $bbdd_server = 'localhost';
    $bbdd_user = 'root';
    $bbdd_password = '';
    $bbdd = 'bd_tgc';

    $conexion = mysqli_connect($bbdd_server, $bbdd_user, $bbdd_password, $bbdd);

    mysqli_query($conexion, 'SET NAMES utf8');
}
/*Congiguración para el servidor*/
else{
    $bbdd_server = 'localhost';
    $bbdd_user = 'jcherram_user';
    $bbdd_password = '1vys8T@2';
    $bbdd = 'jcherram_bd_tgc';

    $conexion = mysqli_connect($bbdd_server,$bbdd_user,$bbdd_password,$bbdd);

    mysqli_query($conexion, 'SET NAMES utf8');
}