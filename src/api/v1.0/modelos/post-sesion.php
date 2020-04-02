<?php
if (isset($_POST['password']) && $_POST['password'] != '' && isset($_POST['usuario']) && $_POST['usuario'] != '') {

    //---------------BD
    $sql = 'SELECT usuario.id_usuario, usuario.nombre, usuario.mail, usuario.password, usuario.id_cliente, roles.nombre as rol, roles.id_rol
FROM usuario
INNER JOIN roles ON roles.id_rol=usuario.id_rol';
    $res = mysqli_query($conexion, $sql);


    foreach ($res as $fila){
        if ($fila['mail']== $_POST['usuario']){
            $_SESSION_TMP['usuario'] = $fila;
        }
    }
    if (isset( $_SESSION_TMP['usuario']) == true){

        $password=$_SESSION_TMP['usuario']['password'];
        if ($_POST['password'] == $password) {
            session_start();
            $_SESSION['registrado'] = 'ok';
            $_SESSION['usuario'] = $_SESSION_TMP['usuario'];
            array_push($salida, $_SESSION['usuario'] );

            $http_code = 200;

        }else{
            $http_code = 401;
        }
    }else{
        $http_code = 401;
    }
} else {
    $http_code = 400;
}

