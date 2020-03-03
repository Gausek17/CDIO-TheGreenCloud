<?php
require_once '../includes/conexion.php';
define('API_VERSION', 'v1.0');

$uri = explode(API_VERSION.'/', parse_url($_SERVER['REQUEST_URI'],
    PHP_URL_PATH))[1];
// 1.2.‐ Lo covertimos en un array ...
$uri_array = explode('/',$uri);

$recurso = array_shift($uri_array);

$operacion = strtolower($_SERVER['REQUEST_METHOD']);

$vista = 'json';
$salida = array();
//Por defecto se supondra que no existe el archivo, por lo que no entra al archivo y no se le cambia el estado
$http_code= 404;

//LINEA DEBUG
//Con el @ omitimos los mensajes de error en la pagina
@include "modelos/$operacion-$recurso.php";
if ($recurso != 'sesion'){
    @include "vistas/$vista.php";
}
