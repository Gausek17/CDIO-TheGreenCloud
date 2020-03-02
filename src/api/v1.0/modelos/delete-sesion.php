<?php
session_start();
if (isset($_SESSION['registrado'])){
    unset($_SESSION['registrado']);
    session_destroy();
    http_response_code(200);
}else{
    //No encuentra la sesion
    http_response_code(404);
}
