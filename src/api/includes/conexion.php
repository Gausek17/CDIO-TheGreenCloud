<?php

/*Local*/
$bbdd_server = 'localhost';
$bbdd_user = 'root';
$bbdd_password = '';
$bbdd = 'bd_tgc';

$conexion = mysqli_connect($bbdd_server,$bbdd_user,$bbdd_password,$bbdd);

mysqli_query($conexion, 'SET NAMES utf8');



/*Servidor
$bbdd_server = 'localhost';
$bbdd_user = 'jchherram_user';
$bbdd_password = '1vys8T@2';
$bbdd = 'jcherram_bd_tgc';

$conexion = mysqli_connect($bbdd_server,$bbdd_user,$bbdd_password,$bbdd);

mysqli_query($conexion, 'SET NAMES utf8');
*/