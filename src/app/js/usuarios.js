let ModeloUsuarios = {
    datos : [],
    cargar : function () {
        fetch('../api/v1.0/current').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            console.log(this);
            this.datos = datosJson;
            this.controlador.representar();
        });
    },
    controlador : {}
};

let VistaSelectorUsuios = {
    selector : {},
    iniciar : function(selectID){
        this.selector = document.getElementById(selectID);
        //this.selector.innerHTML = '<h1>Hello</h1>'
    },
    representar : function (datos) {
                console.log(datos);
            this.selector.innerHTML = `<h1 value="${datos[0].id}">El usuario es: 
                ${datos[0].nombre}
                </h1>`;

        //this.vista.representar(this.modelo.datos);
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
    }
};