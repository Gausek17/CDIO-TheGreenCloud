let ModeloUsuarios = {
    datos : [],
    datosUsuarios:[],
    cargar : function () {
        fetch('../api/v1.0/current').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{

            this.datos = datosJson;
            this.controlador.representar();
        });

        fetch('../api/v1.0/usuarios').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datosUsuarios = datosJson;
            this.controlador.representarUsurios();

        });
    },
    controlador : {}
};


let VistaSelectorUsuios = {
    nombreUsuario : {},
    divUsuarios: {},
    iniciar : function(selectID, divID){
        this.nombreUsuario = document.getElementById(selectID);
        this.divUsuarios = document.getElementById(divID);
    },
    representar : function (datos) {
                console.log(datos);
                this.nombreUsuario.innerHTML = "Bienvenido "+datos[0].nombre;
    },
    representarUsurios : function (datos) {
        var stringPersonas='';
        for (var i = datos.length-1; i>=0;i--){
            stringPersonas+=`<div class="divPerson" id="${datos[i].id_usuario}">
                    <img src="../imagenes/admin/iconUser-white.png" alt="usurio" class="iconUserPerson">
                    <div class="divTextoPersona">
                        <input type="text" class="textNombre" id ="textNombre${datos[i].id_usuario}" value="${datos[i].nombre}">
                        <input type="text" class="textCorreo" id ="textCorreo${datos[i].id_usuario}" value="${datos[i].mail}">
                    </div>
                    <img src="../imagenes/admin/iconEdit-white.png" alt="Editar usuario" class="iconEditUser" id="iconEditar${datos[i].id_usuario}" onclick="editUser(${datos[i].id_usuario})">
                    <img src="../imagenes/admin/iconOk.svg" alt="Aceptar" class="iconAceptarCancel" id="iconAceptar${datos[i].id_usuario}" onclick="aceptar(${datos[i].id_usuario})">
                    <img src="../imagenes/admin/iconDelete-white.png" alt="Elimina usuario" class="iconDeleteUser"  id="iconDelete${datos[i].id_usuario}" onclick="deleteUser(${datos[i].id_usuario})">
                    <img src="../imagenes/admin/iconCancel.jpg" alt="Cancelar" class="iconAceptarCancel"  id="iconCancel${datos[i].id_usuario}" onclick="cancelar(${datos[i].id_usuario})">
                </div>`;
        }

        this.divUsuarios.innerHTML =stringPersonas;
        for (var j = 0; j<datos.length;j++){
            document.getElementById("textCorreo"+datos[j].id_usuario).disabled=true;
            document.getElementById("textNombre"+datos[j].id_usuario).disabled=true;
        }
    }
};
let ControladorUsuarios = {
    modelo : ModeloUsuarios,
    vista : VistaSelectorUsuios,
    iniciar : function () {
        this.modelo.controlador = this;
        this.modelo.cargar();
    },

    representar : function () {
        this.vista.representar(this.modelo.datos);
    },
    representarUsurios: function () {
        if (this.vista.divUsuarios !=null){
            this.vista.representarUsurios(this.modelo.datosUsuarios);
        }

    }
};


function deleteUser(id){
    if(confirm("Este usuario y todos sus datos se perderán para siempre.\n ¿Desea continuar?")){
        fetch('../api/v1.0/usuario&'+id, {method: "delete" }).then(function (respuesta) {
            if(respuesta.status === 200) {
                document.getElementById(id).remove();
            }else{
                alert("Se ha producido un error en el proceso de borrar.");
            }
        })
    }
}

function editUser(id){
    document.getElementById("textCorreo"+id).disabled=false;
    document.getElementById("textNombre"+id).disabled=false;

    document.getElementById("iconEditar"+id).style.display="none";
    document.getElementById("iconDelete"+id).style.display="none";

    document.getElementById("iconAceptar"+id).style.display="block";
    document.getElementById("iconCancel"+id).style.display="block";
}

function aceptar(id){
   disbleEdit(id);
    var formData = new FormData();
    formData.append("nombre", document.getElementById("textNombre"+id).value);
    formData.append("mail", document.getElementById("textCorreo"+id).value);
    formData.append("id", id);
    fetch('../api/v1.0/usuario', {
        method : 'post',
        body : formData
    }).then(function (respuesta) {
        console.log(respuesta.status);
    });

}

function cancelar(id) {
    fetch('../api/v1.0/usuario&'+id, {method : 'get'}).then(function (respuesta) {
        return respuesta.json();
    }).then((datosJson) =>{
        document.getElementById("textCorreo"+id).value=datosJson[0].mail;
        document.getElementById("textNombre"+id).value=datosJson[0].nombre;

    });
    disbleEdit(id);


}

function disbleEdit(id){

    document.getElementById("textCorreo"+id).disabled=true;
    document.getElementById("textNombre"+id).disabled=true;

    document.getElementById("iconEditar"+id).style.display="block";
    document.getElementById("iconDelete"+id).style.display="block";

    document.getElementById("iconAceptar"+id).style.display="none";
    document.getElementById("iconCancel"+id).style.display="none";
}

function modoNuevoUser() {
    document.getElementById("divNuevoUsuario").style.display  = "none";
    document.getElementById("divContenidoUserNuevo").style.display  = "block";
}
function nuevoUser() {
    var formData = new FormData();
    formData.append("nombre", document.getElementById("nuevoNombre").value);
    formData.append("mail", document.getElementById("nuevoCorreo").value);
    formData.append("password",document.getElementById("nuevaPassword").value);
    //Se supone que solo pueden registraser trbajadores de campo
    formData.append("id_rol","2");
    fetch('../api/v1.0/usuario&0', {
        method : 'post',
        body : formData
    }).then(function (respuesta) {
        if (respuesta.status===200){
            ControladorUsuarios.iniciar();
            cancelarNuevoUser();
        }else{
            alert("Se ha producido un error con el insert.")
        }
    });
    
}
function cancelarNuevoUser() {
    document.getElementById("divNuevoUsuario").style.display  = "flex";
    document.getElementById("divContenidoUserNuevo").style.display  = "none";
    document.getElementById("nuevoNombre").value = "";
    document.getElementById("nuevaPassword").value = "";
    document.getElementById("nuevoCorreo").value = "";
    document.getElementById("nuevaPasswordConfirmada").value = "";
}


