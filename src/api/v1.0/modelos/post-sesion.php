<?php

if (isset($_POST['password']) && $_POST['password'] != '' && isset($_POST['usuario']) && $_POST['usuario'] != '') {

    //---------------BD
    $sql = 'SELECT * FROM `cliente`';
    $res = mysqli_query($conexion, $sql);

    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salida, $fila);
    }
    $usuarioEncontrado = false;
    $contraTemp = '';
    foreach ($salida as $fila){
        echo "USUARIO: ".$fila["nombre"]." y contraseña:".$fila["password"];
        if ($fila['nombre']== $_POST['usuario']){
            $usuarioEncontrado = true;
            $contraTemp=$fila['password'];
        }
    }
    if ($usuarioEncontrado == true){
        $password=$contraTemp;
        if ($_POST['password'] == $password) {
            session_start();
            $_SESSION['registrado'] = 'ok';
            http_response_code(200);
        }
    }else{
        http_response_code(401);
    }
} else {


    http_response_code(400);
}



