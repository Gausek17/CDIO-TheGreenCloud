<?php
require_once '../../includes/conexion.php';

$sql = 'SELECT `id_usuario`, `nombre`, `mail`, `id_rol` FROM `usuario` where `id_rol` = 2';

$res = mysqli_query($conexion, $sql);

$salida = array();

/*while ($fila = mysqli_fetch_assoc($res)) {
    array_push($salida, $fila);
}*/
while ($fila = mysqli_fetch_assoc($res)){
	array_push($salida, $fila);
}
//$http_code = 200;

echo json_encode($salida);
 
?>