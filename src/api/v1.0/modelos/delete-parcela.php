<?php
$sql = 'DELETE FROM parcela WHERE id_parcela='.$id;
$res = mysqli_query($conexion, $sql);
if($res==true){
    $http_code = 200;
}else{
    $http_code = 400;
}
