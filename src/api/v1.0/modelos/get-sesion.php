<?php

session_start();
if (isset($_SESSION['registrado']) && $_SESSION['registrado'] == 'ok') {
    if ($_SESSION['usuario']['id_rol'] == 1){
        http_response_code(200);
    }else{
        http_response_code(403);

    }

} else {
    http_response_code(401);
}