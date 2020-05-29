let ModeloDivParcelas = {
    parcelas: [],
    cargar: function (callback) {
        fetch('../api/v1.0/parcelasUnicas').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            this.parcelas = datosJson;
            this.controlador.representarParcelas();

            if (callback != null) {
                callback();
            }
        });
    },
    controlador: {}
};
let contadorNuevasSondas = 0;

let VistaDivParcelas = {
    divParcela: {},
    iniciar: function (divID) {
        this.divParcela = document.getElementById(divID);
    },
    representarParcelas: function (datos) {
        var stringParcelas = '';

        for (var i = datos.length - 1; i >= 0; i--) {
            var listaSondas = getSondas(datos[i].id_parcela);
            var stringColumnaNombre = "";
            var stringColumnaLat = "";
            var stringColumnaLong = "";
            var stringColumnaEliminar = "";
            for (var x = 0; x < listaSondas.length; x++) {
                stringColumnaNombre += `<div class="casillaTabla casillaName" id="casillaTablaNombre${listaSondas[x].id_sonda}"><input type="text" id ="inputNombreSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].nombre}"></div>`;
                stringColumnaLat += `<div class="casillaTabla" id="casillaTablaLat${listaSondas[x].id_sonda}"><input type="text" id ="latSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].lat}"></div>`;
                stringColumnaLong += `<div class="casillaTabla" id="casillaTablaLong${listaSondas[x].id_sonda}"><input type="text" id ="longSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].lng}"></div>`
                stringColumnaEliminar += `<div class="casillaEdicion" id="casillaTablaRemove${listaSondas[x].id_sonda}"><i class="fas fa-minus-square" onclick="modalConfirmarSonda(event, ${listaSondas[x].id_sonda})"></i></div>`;
            }

            stringParcelas += `<div class="divParcela" id="divParcela${datos[i].id_parcela}">
                    <form id="formularioParcela${datos[i].id_parcela}" class="formularioParcela">
                        <div class="divParcelaIzq">
                            <div class="divInfoEtiqueta">
                                <label for="inputNombreParcela${datos[i].id_parcela}">Nombre:</label>
                                <input type="text" id ="inputNombreParcela${datos[i].id_parcela}" value="${datos[i].nombre}">
                            </div>
                            <div class="divInfoEtiqueta">
                                <label for="inputColorParcela${datos[i].id_parcela}">Color:</label>
                                <input type="text" id ="inputColorParcela${datos[i].id_parcela}" value="${datos[i].color}">
                            </div>
                            <div class="contenedorBotonesEscitorio" id="contenedorBotonesEscitorio${datos[i].id_parcela}">
                                <div class="botonesEditar" id="botonesEditar${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="editParcelaOn(event, ${datos[i].id_parcela})">Editar</button>
                                    <button class="botonSecundario" onclick="modalConfirmarParcela(event,${datos[i].id_parcela})">Borrar</button>
                                </div>
                                <div class="botonesConfirmar" id="botonesConfirmar${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="aceptar(event, ${datos[i].id_parcela})">Aceptar</button>
                                    <button class="botonSecundario" onclick="cancelerEditParcela(event, ${datos[i].id_parcela})">Cancelar</button>
                                </div>

                            </div>

                        </div>
                        <div class="divParcelaDer">
                            <div class="divHeaderTabla">
                                <div>Sondas</div>
                                <!--<div class="botonCoordenadas" id="botonCoordenadas${datos[i].id_parcela}">
                                    <i class="fas fa-cog"></i>
                                    <div>Localización</div>
                                </div>-->
                            </div>
                            <div>
                                <div class="divTabla">
                                    <div class="divcolumnaInicio" id="divColumnaInicio${datos[i].id_parcela}">
                                        <div class="tituloTabla casillaName">Nombre</div>` + stringColumnaNombre + `
                                    </div>
                                    <div class="divColumna" id="divColumna${datos[i].id_parcela}">
                                        <div class="tituloTabla">Latitud</div>` + stringColumnaLat + `
                                    </div>
                                    <div class="divColumnaFin" id="divColumnaFin${datos[i].id_parcela}">
                                        <div class="tituloTabla">Longitud</div>` + stringColumnaLong + `
                                    </div>
                                    <div class="divColumnaSinBorde" id="divColumanSinBorde${datos[i].id_parcela}">
                                        <div class="casillaTabla"><i class="fas fa-plus-square" onclick="nuevaSonda(event, ${datos[i].id_parcela})"></i></div>
                                        <div class="divColumnaEdicion" id="divColumnaEdicion${datos[i].id_parcela}">
                                            ` + stringColumnaEliminar + `
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="contenedorBotonesMobil" id="contenedorBotonesMobil${datos[i].id_parcela}" >
                                <div class="botonesEditar" id="botonesEditarM${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="editParcelaOn(event, ${datos[i].id_parcela})">Editar</button>
                                    <button class="botonSecundario" onclick="modalConfirmarParcela(event, ${datos[i].id_parcela})">Borrar</button>
                                </div>
                                <div class="botonesConfirmar" id="botonesConfirmarM${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="aceptar(event, ${datos[i].id_parcela})">Aceptar</button>
                                    <button class="botonSecundario" onclick="cancelerEditParcela(event, ${datos[i].id_parcela})">Cancelar</button>
                                </div>

                            </div>
                        </div>
                    </form>

                </div>`;
        }

        this.divParcela.innerHTML = stringParcelas;
        //Una vez se han creado los elemenots se desactivan
        for (var j = 0; j < datos.length; j++) {
            inputsActivados(false, datos[j].id_parcela);
        }
    }
};


let ControladorDivParcelas = {
    modelo: ModeloDivParcelas,
    vista: VistaDivParcelas,
    iniciar: function (callback) {
        this.modelo.controlador = this;
        this.modelo.cargar(callback);
    },
    representarParcelas: function () {
        if (this.vista.divParcela != null) {
            this.vista.representarParcelas(this.modelo.parcelas);
        }

    }
};

function inputsActivados(activado, id_parcela) {
    var estado = !activado;
    document.getElementById("inputNombreParcela" + id_parcela).disabled = estado;
    document.getElementById("inputColorParcela" + id_parcela).disabled = estado;

    var listaSondas = getSondas(id_parcela);

    for (var x = 0; x < listaSondas.length; x++) {

        document.getElementById("inputNombreSonda" + listaSondas[x].id_sonda).disabled = estado;
        document.getElementById("latSonda" + listaSondas[x].id_sonda).disabled = estado;
        document.getElementById("longSonda" + listaSondas[x].id_sonda).disabled = estado;
    }
}

function editParcelaOn(event, id) {
    event.preventDefault();
    inputsActivados(true, id);
    document.getElementById("botonesConfirmarM" + id).style.display = "block";
    document.getElementById("botonesEditarM" + id).style.display = "none";
    document.getElementById("botonesConfirmar" + id).style.display = "block";
    document.getElementById("botonesEditar" + id).style.display = "none";
    document.getElementById("divColumanSinBorde" + id).style.display = "block";
}


function deleteParcela(id) {
    fetch('../api/v1.0/parcela&' + id, {
        method: "delete"
    }).then(function (respuesta) {
        if (respuesta.status === 200) {
            document.getElementById("divParcela" + id).remove();
        } else {
            alert("Se ha producido un error en el proceso de borrar.");
        }
    })

}

function deleteSonda(id) {

    fetch('../api/v1.0/sonda&' + id, {
        method: "delete"
    }).then(function (respuesta) {
        if (respuesta.status === 200) {
            ModeloSonda.cargar();
            document.getElementById("casillaTablaNombre" + id).remove();
            document.getElementById("casillaTablaLat" + id).remove();
            document.getElementById("casillaTablaLong" + id).remove();
            document.getElementById("casillaTablaRemove" + id).remove();
        } else {
            alert("Se ha producido un error en el proceso de borrar.");
        }
    })

}

function aceptar(event, id) {
    event.preventDefault();

    var formData = new FormData();
    formData.append("nombre", document.getElementById("inputNombreParcela" + id).value);
    formData.append("color", document.getElementById("inputColorParcela" + id).value);
    formData.append("id_parcela", id);
    fetch('../api/v1.0/parcela&' + id, {
        method: 'post',
        body: formData
    }).then(function (respuesta) {
        if (respuesta.status !== 200) {
            window.alert("Se ha producido un error a la hora de modificar la parcela.");
        } else {
            //Para las nuevas sondas

            for (var i = 0; i < contadorNuevasSondas; i++) {
                console.log("creando...")
                var formData = new FormData();
                formData.append("nombre", document.getElementById("inputNombreNuevaSonda" + i).value);
                formData.append("lat", document.getElementById("latSondaNuevo" + i).value);
                formData.append("lng", document.getElementById("longSondaNuevo" + i).value);
                formData.append("id_parcela", id);
                fetch('../api/v1.0/sonda&' + 0, {
                    method: 'post',
                    body: formData
                }).then(function (respuesta) {
                    if (respuesta.status !== 200) {
                        window.alert("Se ha producido un error a la hora de insertar una parcela");
                    }
                });
            }

            var listaSondas = getSondas(id);
            for (var i = 0; i < listaSondas.length; i++) {
                var formData = new FormData();
                formData.append("nombre", document.getElementById("inputNombreSonda" + listaSondas[i].id_sonda).value);
                formData.append("lat", document.getElementById("latSonda" + listaSondas[i].id_sonda).value);
                formData.append("lng", document.getElementById("longSonda" + listaSondas[i].id_sonda).value);
                fetch('../api/v1.0/sonda&' + listaSondas[i].id_sonda, {
                    method: 'post',
                    body: formData
                }).then(function (respuesta) {
                    if (respuesta.status !== 200) {
                        window.alert("Se ha producido un error a la hora de modificar el usuario.");
                    } else {

                        ModeloSonda.cargar();
                        ModeloDivParcelas.cargar();
                    }
                });
            }


        }

    });


}

function cancelerEditParcela(event, id) {
    event.preventDefault();
    VistaDivParcelas.representarParcelas(ModeloDivParcelas.parcelas);
    //inputsActivados(false,id);
}

function nuevaSonda(event, id) {
    event.preventDefault();
    //Columna Nombre
    var string = document.getElementById("divColumnaInicio" + id).innerHTML;
    string += `<div class="casillaTabla casillaName" id="casillaTablaNombreNuevo${contadorNuevasSondas}"><input type="text" id ="inputNombreNuevaSonda${contadorNuevasSondas}" value=""></div>`;
    document.getElementById("divColumnaInicio" + id).innerHTML = string;
    //Columna Latitud
    string = document.getElementById("divColumna" + id).innerHTML;
    string += `<div class="casillaTabla" id="casillaTablaLatNuevo${contadorNuevasSondas}"><input type="text" id ="latSondaNuevo${contadorNuevasSondas}" value="0.000"></div>`;
    document.getElementById("divColumna" + id).innerHTML = string;

    //Columna longitud
    string = document.getElementById("divColumnaFin" + id).innerHTML;
    string += `<div class="casillaTabla" id="casillaTablaLongNuevo${contadorNuevasSondas}"><input type="text" id ="longSondaNuevo${contadorNuevasSondas}" value="0.000"></div>`;
    document.getElementById("divColumnaFin" + id).innerHTML = string;

    //ColumnaBorrar
    string = document.getElementById("divColumnaEdicion" + id).innerHTML;
    string += `<div class="casillaEdicion" id="casillaTablaRemoveNuevo${contadorNuevasSondas}"><i class="fas fa-minus-square" onclick="modalConfirmarSonda(event, null)"></i></div>`;
    ;
    document.getElementById("divColumnaEdicion" + id).innerHTML = string;

    contadorNuevasSondas++;
}


function modoNuevaParcela() {
    document.getElementById("divNuevaParcela").style.display = "block";
}

function nuevaParcela(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append("nombre", document.getElementById("inputNombreParcelaNueva").value);
    formData.append("color", document.getElementById("inputColorParcelaNueva").value);
    //Se hace la peticion con id_Usuario 0, por lo que implica que se creara un usuario
    fetch('../api/v1.0/parcela&0', {
        method: 'post',
        body: formData
    }).then(function (respuesta) {
        if (respuesta.status === 200) {
            for (var i = 1; i<=3;i++){

            }
            var formData = new FormData();
            formData.append("nombre", document.getElementById("inputNombreParcelaNueva").value);
            formData.append("color", document.getElementById("inputColorParcelaNueva").value);
            //Se hace la peticion con id_Usuario 0, por lo que implica que se creara un usuario
            fetch('../api/v1.0/parcela&0', {
                method: 'post',
                body: formData
            }).then(function (respuesta) {
                if (respuesta.status === 200) {

                    ControladorDivParcelas.iniciar();

                } else {
                    alert("Se ha producido un error a la hora de crear una coordenada.")
                }
            });
            document.getElementById("divNuevaParcela").style.display = "none";
        } else {
            alert("Se ha producido un error a la hora de crear la parcela.")
        }
    });
}

function cancelarNueaParcela(event) {
    event.preventDefault();
    document.getElementById("divNuevaParcela").style.display = "none";

}

function filtrarParcelas() {
    let stringParcelas = '';

    let datos = ModeloDivParcelas.parcelas;
    let texto = document.getElementById("buscador").value.toLowerCase();
    //Lista para desabilitar los usuarios encontrados (por defecto estan en modoEdicion)
    let listaTmp = [];

    for (var i = 0; i < datos.length; i++) {
        let nombre = datos[i].nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            listaTmp.push(datos[i]);
            //indexOf te devuelve el elemento si existe

            var listaSondas = getSondas(datos[i].id_parcela);
            var stringColumnaNombre = "";
            var stringColumnaLat = "";
            var stringColumnaLong = "";
            var stringColumnaEliminar = "";
            for (var x = 0; x < listaSondas.length; x++) {
                stringColumnaNombre += `<div class="casillaTabla casillaName" id="casillaTablaNombre${listaSondas[x].id_sonda}"><input type="text" id ="inputNombreSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].nombre}"></div>`;
                stringColumnaLat += `<div class="casillaTabla" id="casillaTablaLat${listaSondas[x].id_sonda}"><input type="text" id ="latSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].lat}"></div>`;
                stringColumnaLong += `<div class="casillaTabla" id="casillaTablaLong${listaSondas[x].id_sonda}"><input type="text" id ="longSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].lng}"></div>`
                stringColumnaEliminar += `<div class="casillaEdicion" id="casillaTablaRemove${listaSondas[x].id_sonda}"><i class="fas fa-minus-square" onclick="modalConfirmarSonda(event, ${listaSondas[x].id_sonda})"></i></div>`;
            }

            stringParcelas += `<div class="divParcela" id="divParcela${datos[i].id_parcela}">
                    <form id="formularioParcela${datos[i].id_parcela}" class="formularioParcela">
                        <div class="divParcelaIzq">
                            <div class="divInfoEtiqueta">
                                <label for="inputNombreParcela${datos[i].id_parcela}">Nombre:</label>
                                <input type="text" id ="inputNombreParcela${datos[i].id_parcela}" value="${datos[i].nombre}">
                            </div>
                            <div class="divInfoEtiqueta">
                                <label for="inputColorParcela${datos[i].id_parcela}">Color:</label>
                                <input type="text" id ="inputColorParcela${datos[i].id_parcela}" value="${datos[i].color}">
                            </div>
                            <div class="contenedorBotonesEscitorio" id="contenedorBotonesEscitorio${datos[i].id_parcela}">
                                <div class="botonesEditar" id="botonesEditar${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="editParcelaOn(event, ${datos[i].id_parcela})">Editar</button>
                                    <button class="botonSecundario" onclick="modalConfirmarParcela(event,${datos[i].id_parcela})">Borrar</button>
                                </div>
                                <div class="botonesConfirmar" id="botonesConfirmar${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="aceptar(event, ${datos[i].id_parcela})">Aceptar</button>
                                    <button class="botonSecundario" onclick="cancelerEditParcela(event, ${datos[i].id_parcela})">Cancelar</button>
                                </div>

                            </div>

                        </div>
                        <div class="divParcelaDer">
                            <div class="divHeaderTabla">
                                <div>Sondas</div>
                                <!--<div class="botonCoordenadas" id="botonCoordenadas${datos[i].id_parcela}">
                                    <i class="fas fa-cog"></i>
                                    <div>Localización</div>
                                </div>-->
                            </div>
                            <div>
                                <div class="divTabla">
                                    <div class="divcolumnaInicio" id="divColumnaInicio${datos[i].id_parcela}">
                                        <div class="tituloTabla casillaName">Nombre</div>` + stringColumnaNombre + `
                                    </div>
                                    <div class="divColumna" id="divColumna${datos[i].id_parcela}">
                                        <div class="tituloTabla">Latitud</div>` + stringColumnaLat + `
                                    </div>
                                    <div class="divColumnaFin" id="divColumnaFin${datos[i].id_parcela}">
                                        <div class="tituloTabla">Longitud</div>` + stringColumnaLong + `
                                    </div>
                                    <div class="divColumnaSinBorde" id="divColumanSinBorde${datos[i].id_parcela}">
                                        <div class="casillaTabla"><i class="fas fa-plus-square" onclick="nuevaParcela(event, ${datos[i].id_parcela})"></i></div>
                                        <div class="divColumnaEdicion" id="divColumnaEdicion${datos[i].id_parcela}">
                                            ` + stringColumnaEliminar + `
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="contenedorBotonesMobil" id="contenedorBotonesMobil${datos[i].id_parcela}" >
                                <div class="botonesEditar" id="botonesEditarM${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="editParcelaOn(event, ${datos[i].id_parcela})">Editar</button>
                                    <button class="botonSecundario" onclick="modalConfirmarParcela(event, ${datos[i].id_parcela})">Borrar</button>
                                </div>
                                <div class="botonesConfirmar" id="botonesConfirmarM${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="aceptar(event, ${datos[i].id_parcela})">Aceptar</button>
                                    <button class="botonSecundario" onclick="cancelerEditParcela(event, ${datos[i].id_parcela})">Cancelar</button>
                                </div>

                            </div>
                        </div>
                    </form>

                </div>`;
        }
    }
    if (stringParcelas === '') {
        stringParcelas += `<p>parcela no encontrado</p>`
    }

    VistaDivParcelas.divParcela.innerHTML = stringParcelas;

    for (var j = 0; j < listaTmp.length; j++) {
        inputsActivados(false, listaTmp[j].id_parcela);
    }
}
