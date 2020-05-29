let ModeloSonda = {
    datosSonda: [],
    cargar: function (callback) {
        fetch('../api/v1.0/sonda').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            this.datosSonda = datosJson;
            callback();

        })
    }
}

function getSondas(id_parcela) {
    let listaSondas=[];
    console.log(ModeloSonda.datosSonda);
    let lista = ModeloSonda.datosSonda;

    for (let i = 0; i < lista.length ; i++) {
        if (lista[i].id_parcela == id_parcela) {
            listaSondas.push(lista[i])

        }
    }
    return listaSondas;
}
