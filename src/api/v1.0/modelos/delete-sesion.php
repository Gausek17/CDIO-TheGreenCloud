<?php
session_start();
if (isset($_SESSION['registrado'])){
    unset($_SESSION['registrado']);
    session_destroy();
    $http_code = 200;
}else{
    //No encuentra la sesion
    $http_code = 404;
}
