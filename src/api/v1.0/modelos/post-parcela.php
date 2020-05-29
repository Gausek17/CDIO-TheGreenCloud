<?php
session_start();
if ($id == 0){
    if (isset($_SESSION['registrado'])){
        $nombre=$_POST['nombre'];
        $color=$_POST['color'];
        $sql = "INSERT INTO parcela (`id_parcela`,`nombre`, `color`, `id_campo`)
            VALUES (NULL,'$nombre', '$color', 1)";
    }
}else{

    $nombre=$_POST['nombre'];
    $color=$_POST['color'];

    $sql = "UPDATE parcela SET nombre='$nombre', color='$color' WHERE id_parcela='$id'";
}


$res = mysqli_query($conexion, $sql);
if($res==true){
    $http_code= 200;
}else{
    $http_code= 400;
}
