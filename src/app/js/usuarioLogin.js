let ModeloUsuarioLogin = {
    datos : [],
    datosUsuarios:[],
    cargar : function (callback) {
        fetch('../api/v1.0/sesion').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{

            this.datos = datosJson;
            this.controlador.representar();
            if (callback!=null){
                callback();
            }
        });
    },
    controlador : {}
};


let VistaUsuarioLogin = {
    nombreUsuario : {},
    iniciar : function(elementId){
        this.nombreUsuario = document.getElementById(elementId);
    },
    representar : function (datos) {
                //this.nombreUsuario.innerHTML =datos[0].nombre;
    }
};
let ControladorUsuarioLogin = {
    modelo : ModeloUsuarioLogin,
    vista : VistaUsuarioLogin,
    iniciar : function (callback) {

        this.modelo.controlador = this;
        this.modelo.cargar(callback);
    },

    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
    
};


