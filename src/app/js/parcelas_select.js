let ModeloParcelaSelect = {
    datos : [],
    cargar : function (callback) {
        fetch('../api/v1.0/parcelas').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datos = datosJson;
            this.controlador.llenarSelectUsuarios();
            if (callback!=null){
                callback();
            }
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
        actualizarSelectParcelas();

    }
};
let ControladorSelectParcelas = {
    modelo : ModeloParcelaSelect,
    vista : VistaParcelasSelect,
    iniciar : function (callback) {
        this.modelo.controlador = this;
        this.modelo.cargar(callback);
    },
    llenarSelectUsuarios: function () {
        this.vista.llenarSelectUsuarios();
    }
};

function actualizarSelectParcelas(callback) {
    var stringPersonas='';
    var data = ModeloParcelaSelect.datos;
    var idUsuario;
    //Si no ecuentra el select de usuarios quiere decir que esta en la vista usurio
    //Por tanto siempre devera filtrar por la id de usuario
    if (document.getElementById("selectUsurios") == null){
        idUsuario = ModeloUsuarioLogin.datos[0].id_usuario;
    }else{
        idUsuario = document.getElementById("selectUsurios").value;
    }

    for (var i = data.length-1; i>=0;i--){
        if (data[i].id_usuario == idUsuario){
            stringPersonas+=`<option value="${data[i].id_parcela}">${data[i].nombre}</option>`;
        }
    }
    if (stringPersonas.length===0){
        stringPersonas=`<option value="-1">Sin parcelas</option>`;
    }
    VistaParcelasSelect.selectUsuarios.innerHTML =stringPersonas;
    if (callback!=null){
        callback();
    }
}
