<?php
$sql = 'DELETE FROM usuario WHERE id_usuario='.$id;
$res = mysqli_query($conexion, $sql);
if($res==true){
    $http_code = 200;
}else{
    $http_code = 400;
}

