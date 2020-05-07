let VistaDivParcelas = {
    divParcelas: {},
    iniciar: function (divID) {
        this.divParcelas = document.getElementById(divID);
    },
    representarParcelas: function (datos) {
        var stringParcelas = '';
        for (var i = datos.length - 1; i >= 0; i--) {

            stringParcelas += `
                <div class="divParcelaAsignada">
                    <span>${datos[i].nombre}</span>
                    <img src="../imagenes/admin/iconDelete-white.png" alt="Elimina usuario" class="iconDesasignar"  id="iconDelete${datos[i].id_parcela}" onclick="desasignarParcela(${datos[i].id_parcela})">
                </div>`;
        }

        this.divParcelas.innerHTML = stringParcelas;
        for (var j = 0; j < datos.length; j++) {
            document.getElementById("textCorreo" + datos[j].id_usuario).disabled = true;
            document.getElementById("textNombre" + datos[j].id_usuario).disabled = true;
        }
    }
};
let ControladorDivParcelas = {
    vista: VistaDivParcelas,
    representarUsurios: function () {
        if (this.vista.divParcelas != null) {
            this.vista.representarParcelas(ModeloParcelaSelect.datos);
        }

    }
};


function desasignarParcela(id) {



    /*
    fetch('../api/v1.0/usuario&' + id, {
        method: "delete"
    }).then(function (respuesta) {
        if (respuesta.status === 200) {
            document.getElementById(id).remove();
        } else {
            alert("Se ha producido un error en el proceso de borrar.");
        }
    })
*/
}

function asignarParcela(id) {


    /*
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
            ModeloDivParcelas.cargar();
        }

    });*/

}



function filtrarParcelas() {
    //imprime en la consola lo que escribes en el buscador
    //console.log(formulario.value);
    let stringPersonas = '';
    let listaEncontrados = [];

    let datos = ModeloDivParcelas.datosUsuarios;
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
                    <button alt="Elimina usuario" class="iconEditUser1"  id="iconDelete${datos[i].id_usuario}" onclick="modalConfirmar(${datos[i].id_usuario})">Eliminar Usuario </button>
                    <button alt="Cancelar" class="iconAceptarCancel"  id="iconCancel${datos[i].id_usuario}" onclick="cancelar(${datos[i].id_usuario})">Cancelar cambios</button>
                </div>`;
        }
    }
    if (stringPersonas === '') {
        stringPersonas += `<p>Usuario no encontrado</p>`
    }

    VistaDivParcelas.divParcelas.innerHTML = stringPersonas;
    for (var j = 0; j < listaTmp.length; j++) {
        document.getElementById("textCorreo" + listaTmp[j].id_usuario).disabled = true;
        document.getElementById("textNombre" + listaTmp[j].id_usuario).disabled = true;
    }
}
