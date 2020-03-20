<?php
$sql = 'SELECT * FROM `usuario` where id_usuario='.$id;
$res = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($res)) {
    array_push($salida, $fila);
}
$http_code = 200;