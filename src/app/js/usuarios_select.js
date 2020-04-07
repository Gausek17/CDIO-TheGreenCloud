let ModeloUsuariosSelect = {
    datosUsuarios:[],
    cargar : function (callback) {

        fetch('../api/v1.0/usuarios').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datosUsuarios = datosJson;
            this.controlador.llenarSelectUsuarios();
            if (callback!=null){
                callback();
            }
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
        //var id_usurio = ModeloUsuarioLogin.datos[0].id_usuario;
        for (var i = datos.length-1; i>=0;i--){
                stringPersonas+=`<option value="${datos[i].id_usuario}">${datos[i].nombre}</option>`;
        }
        this.selectUsuarios.innerHTML =stringPersonas;


    }


};
let ControladorSelectUsuarios = {
    modelo : ModeloUsuariosSelect,
    vista : VistaSelectUsuarios,
    iniciar : function (callback) {
        this.modelo.controlador = this;
        this.modelo.cargar(callback);
    },
    llenarSelectUsuarios: function () {
        this.vista.llenarSelectUsuarios(this.modelo.datosUsuarios);

    }
};

