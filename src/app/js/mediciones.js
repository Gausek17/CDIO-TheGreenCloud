let miGraficaTemp;
let miGraficaHum;
let miGraficaLum;
let miGraficaSal;

let ModeloMediciones = {
    datos: [],

    cargar: function () {


        fetch('../api/v1.0/mediciones').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            this.datos = datosJson;
            //console.log(datosJson);
            this.controlador.representarGrafica();
        });
    },
    controlador: {}
};

function formateraHora(hora) {
    let time = hora.split(':');
    return time[0] + ":" + time[1];
}

let VistaMediciones = {
    canvasTemperatura: {},
    canvasLuminosidad: {},
    canvasHumedad: {},
    canvasSalinidad: {},

    iniciar: function (canvasTemperatura, canvasLuminosidad, canvasHumedad, canvasSalinidad) {
        this.canvasTemperatura = document.getElementById(canvasTemperatura);
        this.canvasLuminosidad = document.getElementById(canvasLuminosidad);
        this.canvasHumedad = document.getElementById(canvasHumedad);
        this.canvasSalinidad = document.getElementById(canvasSalinidad);
    },
    representarGrafica: function () {

        pintarGraficas();

    }
};

let controladorMediciones = {
    modelo: ModeloMediciones,
    vista: VistaMediciones,
    iniciar: function () {
        this.modelo.controlador = this;
        this.modelo.cargar();
    },
    representarGrafica: function () {
        this.vista.representarGrafica(this.modelo.datos);
    },

};

function pintarGraficas() {
    var datos = [];
    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;
    var idSonda = document.getElementById("selectSondas").value;
    var fechaSelector = document.getElementById("fechaInicio").value;
    let labelEjeX;
    let datosMedicion;
    let opcionesGrafica;

    let listaLabels = [];
    let listaDatosTemperatura = [];
    let listaDatosHumedad = [];
    let listaDatosSalinidad = [];
    let listaDatosLuminosidad = [];

    //Metodo Fecha Unica --Valores por horas
    var error = false;
    if (document.getElementById("fechaFin").value === "") {
        data.forEach(element => {
            if (element.id_parcela == idParcela && element.fecha === fechaSelector && element.id_sonda == idSonda) {
                datos.push(element);
            }
        });


        labelEjeX = "Horas";
        datos.forEach(element => {
            if (element.tipoDato === "Temperatura") {
                listaLabels.push(formateraHora(element.hora))

            }
        });


        datos.forEach(element => {
            if (element.tipoDato === "Temperatura") {
                listaDatosTemperatura.push(element.medicion)
            } else if (element.tipoDato === "Humedad") {
                listaDatosHumedad.push(element.medicion)
            } else if (element.tipoDato === "Salinidad") {
                listaDatosSalinidad.push(element.medicion)
            } else if (element.tipoDato === "Luminosidad") {
                listaDatosLuminosidad.push(element.medicion)
            }

        });
    } else {

        var fechaInicio = Date.parse(document.getElementById("fechaInicio").value);
        var fechaFin = Date.parse(document.getElementById("fechaFin").value);

        if(fechaInicio>fechaFin){
            error=true;
            modalAviso("La Fecha de Fin no puede superar a la Fecha de Inicio.");
        }else{
            var fechaMedicion;
            labelEjeX = "Días";
            data.forEach(element => {
                fechaMedicion = Date.parse(element.fecha);
                if (element.id_parcela == idParcela && element.id_sonda == idSonda && (fechaMedicion >= fechaInicio && fechaMedicion <= fechaFin)) {
                    datos.push(element);
                }
            });
            fechaMedicion = new Date(fechaInicio);
            let fechaString;

            while (fechaMedicion <= fechaFin) {
                fechaString = dateToString(fechaMedicion);
                //Las labels de la gráfica solo tendran el mes y el dia
                listaLabels.push(dateToStringDayMonyh(fechaMedicion));
                let datosTempertaura = 0;
                let contadorTemperatura = 0;
                let datosHumedad = 0;
                let contadorHumedad = 0;
                let datosSalinidad = 0;
                let contadorSalinidad = 0;
                let datosLuminosidad = 0;
                let contadorLuminosidad = 0;
                datos.forEach(medicion => {
                    if (dateToString(new Date(Date.parse(medicion.fecha))) === fechaString) {

                        if (medicion.tipoDato === "Temperatura") {
                            datosTempertaura = parseFloat(medicion.medicion) + datosTempertaura;

                            contadorTemperatura++;
                        } else if (medicion.tipoDato === "Humedad") {
                            datosHumedad += parseFloat(medicion.medicion);
                            contadorHumedad++;
                        } else if (medicion.tipoDato === "Salinidad") {
                            datosSalinidad += parseFloat(medicion.medicion);
                            contadorSalinidad++;
                        } else if (medicion.tipoDato === "Luminosidad") {
                            datosLuminosidad += parseFloat(medicion.medicion);
                            contadorLuminosidad++;
                        }
                    }
                });

                datosTempertaura = datosTempertaura / contadorTemperatura;
                listaDatosTemperatura.push(datosTempertaura.toFixed(2));
                datosHumedad = datosHumedad / contadorHumedad;
                listaDatosHumedad.push(datosHumedad.toFixed(2));
                datosSalinidad = datosSalinidad / contadorSalinidad;
                listaDatosSalinidad.push(datosSalinidad.toFixed(2));
                datosLuminosidad = datosLuminosidad / contadorLuminosidad;
                listaDatosLuminosidad.push(datosLuminosidad.toFixed(2));
                //Suma 1 dia
                fechaMedicion.setDate(fechaMedicion.getDate() + 1)
            }

        }

    }
    //Si no hay nigun error se creara y actulizara las graficas correctamente
    if (!error){
        datosMedicion = {
            labels: listaLabels,

            datasets: [
                {
                    label: 'Temperatura',

                    data: listaDatosTemperatura,
                    pointBorderColor: 'red',
                    backgroundColor: 'red',
                    borderColor: 'red',
                    lineTension: 0,
                    pointHoverRadius: 5,
                    pointBackgroundColor: 'red',
                    fill: false,


                },
                {
                    label: 'Humedad',

                    data: listaDatosHumedad,
                    pointBorderColor: 'orange',
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                    lineTension: 0,
                    pointHoverRadius: 5,
                    pointBackgroundColor: 'orange',
                    fill: false,
                },
                {
                    label: 'Salinidad',

                    data: listaDatosSalinidad,
                    pointBorderColor: 'green',
                    backgroundColor: 'green',
                    borderColor: 'green',
                    lineTension: 0,
                    pointBackgroundColor: 'green',
                    pointHoverRadius: 5,
                    fill: false,
                },
                {
                    label: 'Luminosidad',
                    fontSize: 12,
                    data: listaDatosLuminosidad,
                    pointBorderColor: 'purple',
                    backgroundColor: 'purple',
                    borderColor: 'purple',
                    lineTension: 0,
                    pointHoverRadius: 5,
                    pointBackgroundColor: 'purple',
                    fill: false,
                }

            ]
        };
        opcionesGrafica = {
            maintainAspectRatio: false,
            responsive: true,
            legend: {
                labels: {
                    fontColor: 'white',
                    letterSpacing: 10,
                    fontSize: 15,
                    fontWeight: 350,
                }
            },
            scales: {
                yAxes: [{

                    scaleLabel: {
                        display: true,
                        fontWeight: 250,
                        fontColor: "white",


                    },
                    ticks: {
                        fontColor: "white",


                    },
                    gridLines: {
                        drawOnChartArea: false
                    }


                }],
                xAxes: [{


                    scaleLabel: {
                        display: true,
                        labelString: labelEjeX,
                        fontColor: "white",
                        fontWeight: 250,
                        letterSpacing: 10,
                        fontSize: 15,


                    },
                    ticks: {
                        fontColor: "white",

                    },
                    gridLines: {
                        borderDash: [2, 5],
                        color: "white",
                        drawOnChartArea: false
                    }

                }]

            }
        };

        if (miGraficaTemp != null) {
            miGraficaTemp.destroy();
        }

        miGraficaTemp = new Chart(VistaMediciones.canvasTemperatura, {
            type: 'line',
            data: datosMedicion,
            backgroundColor: 'white',
            options: opcionesGrafica

        });


    }




}

function setDateToday() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = "0" + day;
    }
    document.getElementById("fechaInicio").value = date.getFullYear() + "-" + month + "-" + day;
}

/*  Funciones auxiliares para la página de gráficas */
function dateToString(date) {
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = "0" + day;
    }
    return date.getFullYear() + "-" + month + "-" + day;

}

function dateToStringDayMonyh(date){
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
        month = "0" + month;
    }
    let day = date.getDate().toString();
    if (day.length === 1) {
        day = "0" + day;
    }
    return month + "-" + day;
}
function changeToDateInterval() {
    document.getElementById("divFechaFin").style.display="block";
    /*document.getElementById("dateIntervalSelector").style.display="none";
    document.getElementById("dateUniqueSelector").style.display="block";*/
    document.getElementById("textSelectorFecha").innerHTML ="Fecha Inicio:";
    pintarGraficas();
}
function changeToDateUnique() {
    document.getElementById("divFechaFin").style.display="none";
    document.getElementById("dateIntervalSelector").style.display="block";
    document.getElementById("dateUniqueSelector").style.display="none";
    document.getElementById("textSelectorFecha").innerHTML ="Fecha:";

    document.getElementById("fechaFin").value = "";

}
function habilitar(nombreselect) {
    document.getElementById(nombreselect).disabled = false;
    document.getElementById(nombreselect).enabled = true;
}
function deshabilitar(nombreselect) {

    document.getElementById(nombreselect).enabled = false;
    document.getElementById(nombreselect).disabled = true;


}
function habilitarSelectParcelas() {
    habilitar("selectParcelas");
}
function habilitarSelectSondas() {
    habilitar("selectSondas");
}
function habilitarFechaInicio() {
    habilitar("fechaInicio");
    habilitar("fechaFin");

}
/*------------------------pop up para mediciones----------------------------*/

    var btnAbrirPopupMediciones = document.getElementById("btn-abrir-popup-mediciones"),
        overlayMediciones = document.getElementById("overlayMediciones"),
        popupMediciones = document.getElementById("popupMediciones"),
        btnCerrarPopupMediciones = document.getElementById("btn-cerrar-popup-mediciones");

    btnAbrirPopupMediciones.addEventListener('click',function () {
        overlayMediciones.classList.add('active');
    });
    btnCerrarPopupMediciones.addEventListener('click',function () {
        overlayMediciones.classList.remove('active');
    });


