function modalConfirmar(textoMostrar){
    let stringPopUp = '<header class="w3-container w3-teal"> \n' +
        '        <span onclick="document.getElementById(\'id01\').style.display=\'none\'" \n' +
        '        class="w3-button w3-large w3-display-topright">&times;</span>\n' +
        '        <h2>¡Enviado!</h2>\n' +
        '      </header>\n' +
        '      <div class="w3-container">\n' +
        '        <p>${textoMostrar}</p>\n' +
        '       \n' +
        '      </div>';


    let datos = ModeloDivUsuarios.datosUsuarios;
    let texto = document.getElementById("buscador").value.toLowerCase();


    for (var i = 0; i < datos.length; i++) {
        let nombre = datos[i].nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            //indexOf te devuelve el elemento si existe
            stringPersonas += `<div class="divPerson" id="${datos[i].id_usuario}">
                    <div class="divTextoPersona">
                        <input type="text" class="textNombre" id ="textNombre${datos[i].id_usuario}" value="${datos[i].nombre}">
                        <input type="text" class="textCorreo" id ="textCorreo${datos[i].id_usuario}" value="${datos[i].mail}">
                    </div>

                    <button alt = "Editar usuario" class="iconEditUser" id=id="iconEditar${datos[i].id_usuario}" onclick="editUser(${datos[i].id_usuario})">Editar Usuario </button>


                   


                    <img src="../imagenes/admin/iconOk.svg" alt="Aceptar" class="iconAceptarCancel" id="iconAceptar${datos[i].id_usuario}" onclick="aceptar(${datos[i].id_usuario})">
                    <img src="../imagenes/admin/iconDelete-white.png" alt="Elimina usuario" class="iconDeleteUser"  id="iconDelete${datos[i].id_usuario}" onclick="deleteUser(${datos[i].id_usuario})">
                    <img src="../imagenes/admin/iconCancel.jpg" alt="Cancelar" class="iconAceptarCancel"  id="iconCancel${datos[i].id_usuario}" onclick="cancelar(${datos[i].id_usuario})">
                </div>`;
        }
    }
    if (stringPersonas === '') {
        stringPersonas += `<p>Usuario no encontrado</p>`
    }
    VistaDivUsuarios.divUsuarios.innerHTML = stringPersonas;



}