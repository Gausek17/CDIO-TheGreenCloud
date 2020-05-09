<?php
session_start();
require_once 'api/includes/conexion.php';
if(empty($_GET['id_usuario']) || empty($_GET['token'])){
    header('Location: index.html');
}

$id_usuario =$_GET['id_usuario'];
$token = $_GET['token'];
$sql = "SELECT * FROM `usuario` WHERE token = '$token' and id_usuario = '$id_usuario' and resetPassword = 1";
$res = mysqli_query($conexion, $sql);
$salidaTMP = array();
while ($fila = mysqli_fetch_assoc($res)) {
    array_push($salidaTMP, $fila);
}
if (count($salidaTMP)==0){
    header('Location: index.html');
}
?>

<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
    <!-- script para los iconos -->
    <link rel="stylesheet" type="text/css" href="css/estilo_login.css">
    <link rel="stylesheet" type="text/css" href="app/css/estilo_formalwindow.css">
    <link rel="shortcut icon" type="image/ico" href="imagenes/login/favicon.ico">
</head>

<body>
<div class="container">
    <section class="login">
        <a href="index.html"><img src="imagenes/logoGTI.svg" alt="Logo GTI" class="logoGTI" onclick=""></a>
        <section class="sectionCentral">
            <section class="sectIzq">
                <img src="imagenes/login/personaGestion.png" alt="Imagen Login" class="imagenLogin">
            </section>
            <section class="sectDer">
                <p>Introduzca una nueva cotraseña:</p>
                <p id="textoError" class="textoError">Usuario o contraseña incorrectos</p>
                <form method="post" onsubmit="enviar(event)" id="formLogin">
                    <div class="divUsuario">
                        <img src="imagenes/login/password.png" alt="Password" class="logoUsuario">
                        <input id="password" class="inputUsuario" type="password" placeholder="Nueva contraseña" name="password" required>
                    </div>
                    <div class="divUsuario">
                        <img src="imagenes/login/password.png" alt="Password" class="logoUsuario">
                        <input id="confirmarPassword" class="inputUsuario" type="password" placeholder="Confimar nueva contraseña" name="conPassword" required>
                    </div>
                    <!-- Elementos necesarios para procesar la peticion -  OCULTOS-->
                    <input type="hidden" id="id_usuario" name="id_usuario" value ="<?php echo $id_usuario; ?>" />
                    <input type="hidden" id="token" name="token" value ="<?php echo $token; ?>" />
                    <!-- ******* -->
                    <input type="submit" value="Cambiar contraseña" class="botonIniciar">
                </form>
            </section>
        </section>
        <p class="textoConcato">¿Aún no eres miembro?</p>
        <button class="botonContacto" onclick="window.location.href='contacto.html'">Contacta con nosotros</button>
    </section>


    <div id="divPopup" class="w3-modal w3-animate-opacity"></div>
</div>
<script src="app/js/modalConfirm.js"></script>
<script>
    function enviar(evento){
        evento.preventDefault();
        if (document.getElementById("confirmarPassword").value === document.getElementById("password").value){
            fetch('api/v1.0/cambiarPassword', {
                method : 'post',
                body : new FormData(document.getElementById('formLogin'))
            }).then(function (respuesta) {

                if(respuesta.status === 200) {
                    modalAvisoBackToLogin("La contraseña se ha modificado correcatamente!", "Proceso de reestablecer contraseña")

                }else {
                    modalAviso("Se ha producido un error.")
                }
            });
        }else{
            modalAviso("La contraseña debe coincidir con la contraeña de confirmación.")
        }

    }
</script>

</body>

</html>



