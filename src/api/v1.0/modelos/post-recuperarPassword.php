<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

if (isset($_POST['usuario']) && $_POST['usuario'] != '') {
    $correoRestaurar= $_POST['usuario'];

    $sql = "SELECT * FROM usuario where mail='$correoRestaurar'" ;
    $res = mysqli_query($conexion, $sql);
    $salidaTMP = array();
    while ($fila = mysqli_fetch_assoc($res)) {
        array_push($salidaTMP, $fila);
    }

    if (count($salidaTMP) > 0){
        $user = $salidaTMP[0];
        $id_usuario = $user['id_usuario'];
        $nombre = $user['nombre'];
        $token = bin2hex(random_bytes(64));


        if($server ==0){
            //URL LOCAL
            $url = 'http://'.$_SERVER["SERVER_NAME"].'/CDIO-TheGreenCloud/src/cambiarPassword.php?id_usuario='.$id_usuario.'&token='.$token;
        }else{
            //URL SERVER
            $url = 'http://'.$_SERVER["SERVER_NAME"].'/cambiarPassword.php?id_usuario='.$id_usuario.'&token='.$token;
        }

        $sql = "UPDATE usuario
                    SET token = '$token', resetPassword =1
                    WHERE id_usuario='$id_usuario'";
        $res = mysqli_query($conexion, $sql);
        if ($res==true){
            $mail = new PHPMailer(true);
            try {
                //Configuracion
                $mail->SMTPDebug = 0;                      //Opcion debug
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';                    // Servidor SMPT al que se enviara (Actualmente solo soporta GMAIL)
                $mail->SMTPAuth   = true;
                $mail->Username   = 'thegreencloud.upv@gmail.com';                     // SMTP User
                $mail->Password   = 't.g.c.123';                               // SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port       = 587;                                    // Puerto SMPT

                //Receptor
                $mail->setFrom('thegreencloud.upv@gmail.com', 'The Green Cloud');
                $mail->addAddress($correoRestaurar, $nombre);
                // Contenido
                $mail->isHTML(true);                                  // Formato HTML
                $mail->Subject = "Recuperar password";
                $mail->Body    = "Saludos $nombre,<br/>Se ha solicitado un cambio de contraseña para su cuenta.
                                    Para establecer una nueva contrase&ntilde;a acceda al siguiente enlace:<a href='$url'>Recuperar contraseña</a>";
                $mail->AltBody = "Saludos $nombre,se ha solicitado un cambio de contraseña para su cuenta.
                                    Para establecer una nueva contrase&ntilde;a acceda al siguiente enlace:'$url'";

                $mail->send();
                $http_code = 200;
            } catch (Exception $e) {

                $http_code = 403;
            }
        }else{

            $http_code=403;
        }
    }else{
        $http_code = 401;
    }
} else {

    $http_code = 401;
}
