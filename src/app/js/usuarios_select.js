let ModeloUsuariosSelect = {
    datos : [],
    datosUsuarios:[],

    cargar : function () {
        fetch('../api/v1.0/sesion').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{

            this.datos = datosJson;
        });

        fetch('../api/v1.0/usuarios').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datosUsuarios = datosJson;
            this.controlador.llenarSelectUsuarios();

        });
    },
    controlador : {}
};


let VistaSelectUsuarios = {
    selectUsuarios : {},
    iniciar : function(selectID){
        this.selectUsuarios = document.getElementById(selectID);
    },

    llenarSelectUsuarios : function (datos) {
        var stringPersonas='';
        var id_usurio = ModeloUsuarios.datos[0].id_usuario;
        for (var i = datos.length-1; i>=0;i--){
            if (id_usurio==datos[i].id_usuario){
                stringPersonas+=`<option value="${datos[i].id_usuario}" selected="selected">${datos[i].nombre}</option>`;
            }else{
                stringPersonas+=`<option value="${datos[i].id_usuario}">${datos[i].nombre}</option>`;
            }

        }
        this.selectUsuarios.innerHTML =stringPersonas;
       actualizarSelect();
    }
};
let ControladorSelectUsuarios = {
    modelo : ModeloUsuariosSelect,
    vista : VistaSelectUsuarios,
    iniciar : function () {
        this.modelo.controlador = this;
        this.modelo.cargar();
    },
    llenarSelectUsuarios: function () {
        this.vista.llenarSelectUsuarios(this.modelo.datosUsuarios);
    }
};

