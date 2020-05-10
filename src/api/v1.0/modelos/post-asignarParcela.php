<?php
echo "Probando";

var_dump($_POST);

/*
if ($id == 0) {
    if (isset($_SESSION['registrado'])) {
        $nombre = $_POST['nombre'];
        $mail = $_POST['mail'];
        $password = $_POST['password'];
        $id_Rol = $_POST['id_rol'];
        $id_cliente = $_SESSION['usuario']['id_cliente'];
        $sql = "INSERT INTO usuario (`id_usuario`,`nombre`, `mail`, `password`, `id_cliente`, `id_rol`)
            VALUES (NULL,'$nombre','$mail', '$password', '$id_cliente', '$id_Rol' )";
    }
} else {
    $nombre = $_POST['nombre'];
    $mail = $_POST['mail'];
    $id = $_POST['id'];
    $sql = "UPDATE usuario SET nombre='$nombre', mail='$mail' WHERE id_usuario='$id'";
}


$res = mysqli_query($conexion, $sql);
if ($res == true) {
    $http_code = 200;
} else {
    $http_code = 400;
}*/
