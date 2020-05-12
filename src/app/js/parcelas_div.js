let ModeloParcelasAsignar = {
    datos: [],
    permisosUsuario: [],
    //0-Todas las parcelas
    //1-Solo las parcelas asignadas
    //2-Solo las parcelas noa asignadas
    modoVisiualizacion:0,
    cargar: function (callback) {
        fetch('../api/v1.0/parcelasUnicas').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            this.datos = datosJson;
            if (callback != null) {
                this.cargarPermisos(callback);
            } else {
                this.cargarPermisos();
            }
        });

    },
    cargarPermisos: function (callback) {
        fetch('../api/v1.0/permisosUsuario').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            this.permisosUsuario = datosJson;
            if (callback != null) {
                callback();
            }
        });
    },

    controlador: {}
};