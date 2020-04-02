let ModeloParcelaSelect = {
    datos : [],
    cargar : function () {
        fetch('../api/v1.0/parcelas').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datos = datosJson;
            this.controlador.llenarSelectUsuarios();
        });
    },
    controlador : {}
};


let VistaParcelasSelect = {
    selectUsuarios : {},
    iniciar : function(selectID){
        this.selectUsuarios = document.getElementById(selectID);
    },

    llenarSelectUsuarios : function () {
        actualizarSelect();

    }
};
let ControladorSelectParcelas = {
    modelo : ModeloParcelaSelect,
    vista : VistaParcelasSelect,
    iniciar : function () {
        this.modelo.controlador = this;
        this.modelo.cargar();
    },
    llenarSelectUsuarios: function () {
        this.vista.llenarSelectUsuarios();
    }
};

function actualizarSelect() {
    var stringPersonas='';
    var data = ModeloParcelaSelect.datos;
    var idUsuario = document.getElementById("selectUsurios").value;

    for (var i = data.length-1; i>=0;i--){
        if (data[i].id_usuario == idUsuario){
            stringPersonas+=`<option value="${data[i].id_parcela}">${data[i].nombre}</option>`;
        }
    }
    if (stringPersonas.length===0){
        stringPersonas=`<option value="-1">Sin parcelas</option>`;
    }
    VistaParcelasSelect.selectUsuarios.innerHTML =stringPersonas;
    pintarGraficas();
}
