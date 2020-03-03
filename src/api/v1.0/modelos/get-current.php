<?php

session_start();

if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok') {
    $http_code=200;
    array_push($salida, $_SESSION["usuario"]);

} else {
    $http_code=200;
}