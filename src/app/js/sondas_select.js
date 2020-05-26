let ModeloSondasSelect = {
    datos:[],
    cargar : function (callback) {

        fetch('../api/v1.0/sonda').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datos = datosJson;
            this.controlador.llenarSelectSondas();
            if (callback!=null){
                callback();
            }
        });
    },
    controlador : {}
};


let VistaSelectSondas = {
    selectSondas : {},
    iniciar : function(selectID){
        this.selectSondas = document.getElementById(selectID);
    },

    llenarSelectSondas : function () {
        actualizarSelectSondas();
    }


};
let ControladorSondasSelect = {
    modelo : ModeloSondasSelect,
    vista : VistaSelectSondas,
    iniciar : function (callback) {
        this.modelo.controlador = this;
        this.modelo.cargar(callback);
    },
    llenarSelectSondas: function () {
        this.vista.llenarSelectSondas();

    }
};

function actualizarSelectSondas(callback) {
   // habilitar("selectSondas");
    var stringSondas='';
    var data = ModeloSondasSelect.datos;
    var idParcela;

    idParcela = document.getElementById("selectParcelas").value;

    for (var i = data.length-1; i>=0;i--){
        if (data[i].id_parcela == idParcela){
            stringSondas+=`<option value="${data[i].id_sonda}">${data[i].nombre}</option>`;
        }
    }
    if (stringSondas.length===0){
        stringSondas=`<option value="-1">Sin sondas</option>`;
    }
    VistaSelectSondas.selectSondas.innerHTML =stringSondas;
    if (callback!=null){
        callback();
    }
}

