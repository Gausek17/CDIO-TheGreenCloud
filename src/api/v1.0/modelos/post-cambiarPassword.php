<?php
if (isset($_POST['password']) && isset($_POST['id_usuario']) && isset($_POST['token'])){
    $password=$_POST['password'];
    $token = $_POST['token'];
    $id_usuario=$_POST['id_usuario'];
    $sql = "UPDATE usuario SET password='$password', resetPassword='0' WHERE id_usuario='$id_usuario' and resetPassword='1' and token='$token'";
    $res = mysqli_query($conexion, $sql);
    if($res==true){
        $http_code= 200;
    }else{
        $http_code= 400;
    }
}else{
    $http_code= 400;
}


