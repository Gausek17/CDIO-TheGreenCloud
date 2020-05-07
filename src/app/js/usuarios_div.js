let ModeloDivUsuarios = {
    datosUsuarios: [],
    cargar: function () {
        fetch('../api/v1.0/usuarios').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            this.datosUsuarios = datosJson;
            this.controlador.representarUsurios();

        });
    },
    controlador: {}
};


let VistaDivUsuarios = {
    divUsuarios: {},
    iniciar: function (divID) {
        this.divUsuarios = document.getElementById(divID);
    },
    representarUsurios: function (datos) {
        var stringPersonas = '';
        for (var i = datos.length - 1; i >= 0; i--) {
            stringPersonas += `<div class="divPerson" id="${datos[i].id_usuario}">
                    
                 
                    <div class="divTextoPersona">
                        <input type="text" class="textNombre" id ="textNombre${datos[i].id_usuario}" value="${datos[i].nombre}">
                        <input type="text" class="textCorreo" id ="textCorreo${datos[i].id_usuario}" value="${datos[i].mail}">
                    </div>


                     <img src="../imagenes/admin/iconEdit-white.png" alt="Editar usuario" class="iconEditUser1" id="iconEditar${datos[i].id_usuario}" onclick="editUser(${datos[i].id_usuario})">
                    
                    <button alt="Aceptar" class="iconAceptarCancel" id="iconAceptar${datos[i].id_usuario}" onclick="aceptar(${datos[i].id_usuario})">Aceptar cambios</button>
                    <button alt="Cancelar" class="iconAceptarCancel"  id="iconCancel${datos[i].id_usuario}" onclick="cancelar(${datos[i].id_usuario})">Cancelar cambios</button>
                    <img src="../imagenes/menu/IconoCampo-White.png" alt="Editar parcelas" class="iconAsign" id="iconSelectParcelas${datos[i].id_usuario}" onclick="modalEdit(${datos[i].id_usuario})">
                    <img src="../imagenes/admin/iconDelete-white.png" alt="Elimina usuario" class="iconEditUser1"  id="iconDelete${datos[i].id_usuario}" onclick="modalConfirmar(${datos[i].id_usuario})">
                    
                </div>`;
        }



        this.divUsuarios.innerHTML = stringPersonas;
        for (var j = 0; j < datos.length; j++) {
            document.getElementById("textCorreo" + datos[j].id_usuario).disabled = true;
            document.getElementById("textNombre" + datos[j].id_usuario).disabled = true;
        }
    }
};
let ControladorDivUsuarios = {
    modelo: ModeloDivUsuarios,
    vista: VistaDivUsuarios,
    iniciar: function () {
        this.modelo.controlador = this;
        this.modelo.cargar();
    },
    representarUsurios: function () {
        if (this.vista.divUsuarios != null) {
            this.vista.representarUsurios(this.modelo.datosUsuarios);
        }

    }
};


function deleteUser(id) {
        fetch('../api/v1.0/usuario&' + id, {
            method: "delete"
        }).then(function (respuesta) {
            if (respuesta.status === 200) {
                document.getElementById(id).remove();
            } else {
                alert("Se ha producido un error en el proceso de borrar.");
            }
        })

}

function editUser(id) {
    document.getElementById("textCorreo" + id).disabled = false;
    document.getElementById("textNombre" + id).disabled = false;

    document.getElementById("iconEditar" + id).style.display = "none";
    document.getElementById("iconDelete" + id).style.display = "none";

    document.getElementById("iconAceptar" + id).style.display = "block";
    document.getElementById("iconCancel" + id).style.display = "block";
}

function aceptar(id) {
    disbleEdit(id);
    var formData = new FormData();
    formData.append("nombre", document.getElementById("textNombre" + id).value);
    formData.append("mail", document.getElementById("textCorreo" + id).value);
    formData.append("id", id);
    fetch('../api/v1.0/usuario', {
        method: 'post',
        body: formData
    }).then(function (respuesta) {
        if (respuesta.status !== 200) {
            window.alert("Se ha producido un error a la hora de modificar el usuario.");
        } else {
            ModeloDivUsuarios.cargar();
        }

    });

}

function cancelar(id) {
    fetch('../api/v1.0/usuario&' + id, {
        method: 'get'
    }).then(function (respuesta) {
        return respuesta.json();
    }).then((datosJson) => {
        document.getElementById("textCorreo" + id).value = datosJson[0].mail;
        document.getElementById("textNombre" + id).value = datosJson[0].nombre;

    });
    disbleEdit(id);


}

function disbleEdit(id) {

    document.getElementById("textCorreo" + id).disabled = true;
    document.getElementById("textNombre" + id).disabled = true;

    document.getElementById("iconEditar" + id).style.display = "block";
    document.getElementById("iconDelete" + id).style.display = "block";

    document.getElementById("iconAceptar" + id).style.display = "none";
    document.getElementById("iconCancel" + id).style.display = "none";
}

function modoNuevoUser() {
    document.getElementById("divNuevoUsuario").style.display = "none";
    document.getElementById("divContenidoUserNuevo").style.display = "block";
}

function nuevoUser() {
    if (document.getElementById("nuevaPassword").value !== document.getElementById("nuevaPasswordConfirmada").value) {
        document.getElementById("divPopupContraseña").style.display = "block";
    } else {
        var formData = new FormData();
        formData.append("nombre", document.getElementById("nuevoNombre").value);
        formData.append("mail", document.getElementById("nuevoCorreo").value);
        formData.append("password", document.getElementById("nuevaPassword").value);
        //Se supone que solo pueden registraser trbajadores de campo
        formData.append("id_rol", "2");
        //Se hace la peticion con id_Usuario 0, por lo que implica que se creara un usuario
        fetch('../api/v1.0/usuario&0', {
            method: 'post',
            body: formData
        }).then(function (respuesta) {
            if (respuesta.status === 200) {
                ControladorDivUsuarios.iniciar();
                cancelarNuevoUser();
            } else {
                alert("Se ha producido un error a la hora de crear el usuario.")
            }
        });
    }
}

function cancelarNuevoUser() {
    document.getElementById("divNuevoUsuario").style.display = "flex";
    document.getElementById("divContenidoUserNuevo").style.display = "none";
    document.getElementById("nuevoNombre").value = "";
    document.getElementById("nuevaPassword").value = "";
    document.getElementById("nuevoCorreo").value = "";
    document.getElementById("nuevaPasswordConfirmada").value = "";
}

function filtrar() {
    //imprime en la consola lo que escribes en el buscador
    //console.log(formulario.value);
    let stringPersonas = '';
    let listaEncontrados = [];

    let datos = ModeloDivUsuarios.datosUsuarios;
    let texto = document.getElementById("buscador").value.toLowerCase();
    //Lista para desabilitar los usuarios encontrados (por defecto estan en modoEdicion)
    let listaTmp=[];

    for (var i = 0; i < datos.length; i++) {
        let nombre = datos[i].nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            listaTmp.push(datos[i]);
            //indexOf te devuelve el elemento si existe
            stringPersonas += `<div class="divPerson" id="${datos[i].id_usuario}">
                    <div class="divTextoPersona">
                        <input type="text" class="textNombre" id ="textNombre${datos[i].id_usuario}" value="${datos[i].nombre}">
                        <input type="text" class="textCorreo" id ="textCorreo${datos[i].id_usuario}" value="${datos[i].mail}">
                    </div>

                    <button alt = "Editar usuario" class="iconEditUser1" id="iconEditar${datos[i].id_usuario}" onclick="editUser(${datos[i].id_usuario})">Editar Usuario </button>
                    
                    <button alt="Aceptar" class="iconAceptarCancel" id="iconAceptar${datos[i].id_usuario}" onclick="aceptar(${datos[i].id_usuario})">Aceptar cambios</button>
                    <button alt="Editar Parcelas" class="iconEditParcelas"  id="iconParcelas${datos[i].id_usuario}" onclick="modalEdit(${datos[i].id_usuario})"> </button>
                    <button alt="Elimina usuario" class="iconEditUser1"  id="iconDelete${datos[i].id_usuario}" onclick="modalConfirmar(${datos[i].id_usuario})">Eliminar Usuario </button>
                    <button alt="Cancelar" class="iconAceptarCancel"  id="iconCancel${datos[i].id_usuario}" onclick="cancelar(${datos[i].id_usuario})">Cancelar cambios</button>
                </div>`;
        }
    }
    if (stringPersonas === '') {
        stringPersonas += `<p>Usuario no encontrado</p>`
    }

    VistaDivUsuarios.divUsuarios.innerHTML = stringPersonas;
    for (var j = 0; j < listaTmp.length; j++) {
        document.getElementById("textCorreo" + listaTmp[j].id_usuario).disabled = true;
        document.getElementById("textNombre" + listaTmp[j].id_usuario).disabled = true;
    }
}
