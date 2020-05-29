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
                stringColumnaNombre += `<div class="casillaTabla casillaName"><input type="text" id ="inputNombreSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].nombre}"></div>`;
                stringColumnaLat += `<div class="casillaTabla"><input type="text" id ="latSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].lat}"></div>`;
                stringColumnaLong += `<div class="casillaTabla"><input type="text" id ="longSonda${listaSondas[x].id_sonda}" value="${listaSondas[x].lng}"></div>`
                stringColumnaEliminar += `<div class="casillaEdicion"><i class="fas fa-minus-square"></i></div>`;
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
                                    <button class="botonSecundario" onclick="cancelerEditParcela(event, ${datos[i].id_parcela})">Borrar</button>
                                </div>
                                <div class="botonesConfirmar" id="botonesConfirmar${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="modoEdicionOff(event, ${datos[i].id_parcela})">Aceptar</button>
                                    <button class="botonSecundario" onclick="cancelerEditParcela(event, ${datos[i].id_parcela})">Cancelar</button>
                                </div>

                            </div>

                        </div>
                        <div class="divParcelaDer">
                            <div class="divHeaderTabla">
                                <div>Sondas</div>
                                <div class="botonCoordenadas" id="botonCoordenadas${datos[i].id_parcela}">
                                    <i class="fas fa-cog"></i>
                                    <div>Localización</div>
                                </div>
                            </div>
                            <div>
                                <div class="divTabla">
                                    <div class="divcolumnaInicio">
                                        <div class="tituloTabla casillaName">Nombre</div>` + stringColumnaNombre + `
                                    </div>
                                    <div class="divColumna">
                                        <div class="tituloTabla">Latitud</div>` + stringColumnaLat + `
                                    </div>
                                    <div class="divColumnaFin">
                                        <div class="tituloTabla">Longitud</div>` + stringColumnaLong + `
                                    </div>
                                    <div class="divColumnaSinBorde" id="divColumanSinBorde${datos[i].id_parcela}">
                                        <div class="casillaTabla"><i class="fas fa-plus-square"></i></div>
                                        <div class="divColumnaEdicion">
                                            ` + stringColumnaEliminar + `
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="contenedorBotonesMobil" id="contenedorBotonesMobil${datos[i].id_parcela}" >
                                <div class="botonesEditar" id="botonesEditarM${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="editParcelaOn(event, ${datos[i].id_parcela})">Editar</button>
                                    <button class="botonSecundario">Borrar</button>
                                </div>
                                <div class="botonesConfirmar" id="botonesConfirmarM${datos[i].id_parcela}">
                                    <button class="botonPrincipal" onclick="modoEdicionOff(event, ${datos[i].id_parcela})">Aceptar</button>
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

function editParcelaOn(event, id, vista) {
    event.preventDefault();
    inputsActivados(true, id);
    document.getElementById("botonesConfirmarM" + id).style.display = "block";
    document.getElementById("botonesEditarM" + id).style.display = "none";
    document.getElementById("botonesConfirmar" + id).style.display = "block";
    document.getElementById("botonesEditar" + id).style.display = "none";
    document.getElementById("botonCoordenadas"+id).style.display = "flex";
    document.getElementById("divColumanSinBorde"+id).style.display= "block";
}


function deleteParcela(id) {
    fetch('../api/v1.0/parcela&' + id, {
        method: "delete"
    }).then(function (respuesta) {
        if (respuesta.status === 200) {
            document.getElementById("divParcela"+id).remove();
        } else {
            alert("Se ha producido un error en el proceso de borrar.");
        }
    })

}


function aceptar(id) {
    disbleEdit(id);
    var formData = new FormData();
    formData.append("nombre", document.getElementById("textNombre" + id).value);
    formData.append("mail", document.getElementById("textCorreo" + id).value);
    formData.append("id", id);
    fetch('../api/v1.0/usuario', {
        method: 'post',
        body: formData
    }).then(function (respuesta) {
        if (respuesta.status !== 200) {
            window.alert("Se ha producido un error a la hora de modificar el usuario.");
        } else {
            ModeloDivParcelas.cargar();
        }

    });

}

function cancelerEditParcela(event, id) {
    event.preventDefault();
    VistaDivParcelas.representarParcelas(ModeloDivParcelas.parcelas);
    //inputsActivados(false,id);
}



function modoNuevoUser() {
    document.getElementById("divNuevoUsuario").style.display = "none";
    document.getElementById("divContenidoUserNuevo").style.display = "block";
}

function nuevoUser() {
    if (document.getElementById("nuevaPassword").value !== document.getElementById("nuevaPasswordConfirmada").value) {
        document.getElementById("divPopupContraseña").style.display = "block";
    } else {
        var formData = new FormData();
        formData.append("nombre", document.getElementById("nuevoNombre").value);
        formData.append("mail", document.getElementById("nuevoCorreo").value);
        formData.append("password", document.getElementById("nuevaPassword").value);
        //Se supone que solo pueden registraser trbajadores de campo
        formData.append("id_rol", "2");
        //Se hace la peticion con id_Usuario 0, por lo que implica que se creara un usuario
        fetch('../api/v1.0/usuario&0', {
            method: 'post',
            body: formData
        }).then(function (respuesta) {
            if (respuesta.status === 200) {
                ControladorDivParcelas.iniciar();
                cancelarNuevoUser();
            } else {
                alert("Se ha producido un error a la hora de crear el usuario.")
            }
        });
    }
}

function cancelarNuevoUser() {
    document.getElementById("divNuevoUsuario").style.display = "flex";
    document.getElementById("divContenidoUserNuevo").style.display = "none";
    document.getElementById("nuevoNombre").value = "";
    document.getElementById("nuevaPassword").value = "";
    document.getElementById("nuevoCorreo").value = "";
    document.getElementById("nuevaPasswordConfirmada").value = "";
}

function filtrar() {
    //imprime en la consola lo que escribes en el buscador
    //console.log(formulario.value);
    let stringParcelas = '';
    let listaEncontrados = [];

    let datos = ModeloDivParcelas.parcelas;
    let texto = document.getElementById("buscador").value.toLowerCase();
    //Lista para desabilitar los usuarios encontrados (por defecto estan en modoEdicion)
    let listaTmp = [];

    for (var i = 0; i < datos.length; i++) {
        let nombre = datos[i].nombre.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            listaTmp.push(datos[i]);
            //indexOf te devuelve el elemento si existe
            stringParcelas += `<div class="divPerson" id="${datos[i].id_usuario}">
                    
                 
                    <div class="divTextoPersona">
                     <input type="text"  class="textNombre" id ="textNombre${datos[i].id_usuario}" value="${datos[i].nombre}">
                        <input type="text" class="textCorreo" id ="textCorreo${datos[i].id_usuario}" value="${datos[i].mail}">
                    </div>


                     <img src="../imagenes/admin/iconEdit-white.png" alt="Editar usuario" class="iconEditUser1" id="iconEditar${datos[i].id_usuario}" onclick="editUser(${datos[i].id_usuario})">
                    
                    <button alt="Aceptar" class="iconAceptarCancel" id="iconAceptar${datos[i].id_usuario}" onclick="aceptar(${datos[i].id_usuario})">Aceptar cambios</button>
                    <button alt="Cancelar" class="iconAceptarCancel2"  id="iconCancel${datos[i].id_usuario}" onclick="cancelar(${datos[i].id_usuario})">Cancelar cambios</button>
                    <img src="../imagenes/menu/IconoCampo-White.png" alt="Editar parcelas" class="iconAsign" id="iconSelectParcelas${datos[i].id_usuario}" onclick="modalAsignarParcelas(${datos[i].id_usuario})">
                    <img src="../imagenes/admin/iconDelete-white.png" alt="Elimina usuario" class="iconEditUser1"  id="iconDelete${datos[i].id_usuario}" onclick="modalConfirmar(${datos[i].id_usuario})">
                    
                </div>`;
        }
    }
    if (stringParcelas === '') {
        stringParcelas += `<p>Usuario no encontrado</p>`
    }

    VistaDivParcelas.divParcela.innerHTML = stringParcelas;
    for (var j = 0; j < listaTmp.length; j++) {
        document.getElementById("textCorreo" + listaTmp[j].id_usuario).disabled = true;
        document.getElementById("textNombre" + listaTmp[j].id_usuario).disabled = true;
    }
}

function getUsuario(id) {
    let data = ModeloDivParcelas.parcelas;
    let user;

    for (let i = 0; i < data.length; i++) {
        if (data[i].id_usuario == id) {
            user = data[i];
        }
    }

    return user;
}
