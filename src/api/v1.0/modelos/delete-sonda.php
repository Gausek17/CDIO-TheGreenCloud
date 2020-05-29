<?php
$sql = 'DELETE FROM sonda WHERE id_sonda='.$id;
$res = mysqli_query($conexion, $sql);
if($res==true){
    $http_code = 200;
}else{
    $http_code = 400;
}
