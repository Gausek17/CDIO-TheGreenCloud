let ModeloCoordenadasParcelaSelect = {
    datosCoordenadas: [],
    cargar: function (callback) {
        fetch('../api/v1.0/coordenadasParcela').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            this.datosCoordenadas = datosJson;
            let nuevasCoordenadas = [];
            let idParcelaActual = this.datosCoordenadas[0].id_parcela;
            let coordParcelaActual;
            let parcela;
            let listaFinal = [];
            //For para agrupar las coordenadas en un unico objeto
            //Que tendra: idParcela, listaCoordenadas
            for (let i = 0; i < this.datosCoordenadas.length; i++) {
                //Detetcatmos el cambio de parcela para separar la agrupcion de coordenadas
                if (idParcelaActual !== this.datosCoordenadas[i].id_parcela) {
                    //Cuando se detecta el cambio de parcelas, se crea el objeto parcela con
                    //las coordendas encontradas hasta el momento
                    parcela = {
                        id_parcela: idParcelaActual,
                        coordenadas: nuevasCoordenadas
                    };
                    idParcelaActual = this.datosCoordenadas[i].id_parcela;
                    nuevasCoordenadas = [];
                    listaFinal.push(parcela);
                    //Añadimos las coordenadas pasados a Float a una lista TMP
                    coordParcelaActual = {
                        lat: parseFloat(this.datosCoordenadas[i].latitud),
                        lng: parseFloat(this.datosCoordenadas[i].longitud)
                    };
                    nuevasCoordenadas.push(coordParcelaActual);
                    //Si no detectamos el cambio de parcela
                    //seguira guardando las coordendas para agruparlas
                } else {
                    //Añadimos las coordenadas pasados a Float a una lista TMP
                    coordParcelaActual = {
                        lat: parseFloat(this.datosCoordenadas[i].latitud),
                        lng: parseFloat(this.datosCoordenadas[i].longitud)
                    };
                    nuevasCoordenadas.push(coordParcelaActual);
                }
            }
            //Añadimos la ultima parcela ya que en la ultima agrupacion no detectara un cambio
            parcela = {
                id_parcela: idParcelaActual,
                coordenadas: nuevasCoordenadas
            };
            listaFinal.push(parcela);

            this.datosCoordenadas = listaFinal;
            if (callback != null) {
                callback();
            }
        });
    }
};

function getCoordendas(id_parcela) {
    let coordenadas;
    let encontrado = false;
    let lista = ModeloCoordenadasParcelaSelect.datosCoordenadas;

    for (let i = 0; i < lista.length && encontrado === false; i++) {
        if (lista[i].id_parcela === id_parcela) {
            coordenadas = lista[i];
            encontrado = true;
        }
    }
    return coordenadas;
}


