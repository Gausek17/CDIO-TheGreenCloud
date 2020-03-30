<?php
session_start();
if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok') {
    array_push($salida, $_SESSION["usuario"]);
    $http_code = 200;
} else {
    $http_code = 401;
}

