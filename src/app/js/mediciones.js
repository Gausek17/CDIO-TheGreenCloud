let miGraficaTemp;
let miGraficaHum;
let miGraficaLum;
let miGraficaSal;

let ModeloMediciones = {
    datos : [],

    cargar : function () {


        fetch('../api/v1.0/mediciones').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datos = datosJson;
            //console.log(datosJson);
            this.controlador.representarGrafica();
        });
    },
    controlador : {}
};

function formateraHora(hora){
    let time=hora.split(':');
    return time[0]+":"+time[1];
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

function pintarGraficaLuminosidad(){
    var datos = [];
    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;
    var idSonda = document.getElementById("selectSondas").value;
    var fechaSelctor = document.getElementById("field1").value;
//Las mediciones seran filtradas por TipoDato - Fecha - Sonda
    data.forEach( element =>{
        if (element.id_parcela == idParcela && element.fecha === fechaSelctor && element.id_sonda == idSonda){
            datos.push(element);
        }
    });
    let listaLabelsLuminosidad = [];
    let listaDatosLuminosidad = [];


    datos.forEach(element => {
        if (element.tipoDato === "Luminosidad") {
            listaLabelsLuminosidad.push(formateraHora(element.hora))
        }
    });

    datos.forEach(element => {
        if (element.tipoDato === "Luminosidad") {
            listaDatosLuminosidad.push(element.medicion)
        }
    });


    let datosMedicionLuminosidad = {
        labels: listaLabelsLuminosidad,
        datasets: [
            {
                label: 'Luminosidad',

                data: listaDatosLuminosidad,
                pointBorderColor: 'white',
                backgroundColor: 'grey',
                borderColor: 'white',
                lineTension: 0,
                pointBackgroundColor: 'white',

            }

        ]
    };
    let opcionesLuminosidad = {
        maintainAspectRatio: false,
        legend:{
            labels:{
                fontColor:'white',
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '% Luz',
                    fontColor:"white",

                },
                ticks: {
                    fontColor: "white",
                },
                gridLines: {
                    drawOnChartArea: false
                }

            }],
            xAxes: [{
                scaleLabel:{
                    display: true,
                    labelString:'Hora',
                    fontColor:"white",
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
    if (miGraficaLum != null){
        miGraficaLum.destroy();
    }

    miGraficaLum = new Chart(VistaMediciones.canvasLuminosidad, {
        type: 'line',
        data: datosMedicionLuminosidad,
        backgroundColor: 'white',
        options: opcionesLuminosidad

    });

}

function pintarGraficaTemperatura(){
    var datos = [];
    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;
    var idSonda = document.getElementById("selectSondas").value;
    var fechaSelector = document.getElementById("fechaInicio").value;
    var fechaInicio = Date.parse(document.getElementById("fechaInicio").value);
    var fechaFin = Date.parse(document.getElementById("fechaFin").value);

    var fechaMedicion;
    data.forEach( element =>{
        console.log(typeof (element.fecha));
        fechaMedicion = element.fecha;
        if (element.id_parcela == idParcela && element.fecha === fechaSelector && element.id_sonda == idSonda){
            datos.push(element);
        }
    });
    
    let listaLabels = [];
    let listaDatosTemperatura = [];
    let listaDatosHumedad = [];
    let listaDatosSalinidad = [];
    let listaDatosLuminosidad = [];
    
    datos.forEach(element => {
        if (element.tipoDato === "Temperatura") {
            listaLabels.push(formateraHora(element.hora))

        }
    });


    datos.forEach(element => {
        if (element.tipoDato === "Temperatura") {
            listaDatosTemperatura.push(element.medicion)
        }else if (element.tipoDato === "Humedad") {
            listaDatosHumedad.push(element.medicion)
        }else if (element.tipoDato === "Salinidad") {
            listaDatosSalinidad.push(element.medicion)
        }else if (element.tipoDato === "Luminosidad") {
            listaDatosLuminosidad.push(element.medicion)
        }

    });


    let datosMedicionTemperatura = {
        labels: listaLabels,

        datasets: [
            {
                label: 'Temperatura',

                data: listaDatosTemperatura,
                pointBorderColor: 'red',
                backgroundColor: 'red',
                borderColor: 'red',
                lineTension: 0,
                pointHoverRadius:5,
                pointBackgroundColor: 'red',
                fill:false,


            },
            {
                label: 'Humedad',

                data: listaDatosHumedad,
                pointBorderColor: 'orange',
                backgroundColor: 'orange',
                borderColor: 'orange',
                lineTension: 0,
                pointHoverRadius:5,
                pointBackgroundColor: 'orange',
                fill:false,
            },
            {label: 'Salinidad',

                data: listaDatosSalinidad,
                pointBorderColor: 'green',
                backgroundColor: 'green',
                borderColor: 'green',
                lineTension: 0,
                pointBackgroundColor: 'green',
                pointHoverRadius:5,
                fill:false,
            },
            {
                label: 'Luminosidad',
                fontSize:12,
                data: listaDatosLuminosidad,
                pointBorderColor: 'purple',
                backgroundColor: 'purple',
                borderColor: 'purple',
                lineTension: 0,
                pointHoverRadius:5,
                pointBackgroundColor: 'purple',
                fill:false,
            }

        ]
    };
    let opcionesGrafica = {
        maintainAspectRatio: false,
        responsive:true,
        legend:{
            labels:{
                fontColor:'white',
                letterSpacing:10,
                fontSize:15,
                fontWeight:350,
            }
        },
        scales: {
            yAxes: [{

                scaleLabel: {
                    display: true,
                    fontWeight:250,
                    fontColor:"white",


                },
                ticks: {
                    fontColor: "white",


                },
                gridLines: {
                    drawOnChartArea: false
                }


            }],
            xAxes: [{



                scaleLabel:{
                    display: true,
                    labelString:'Horas',
                    fontColor:"white",
                    fontWeight:250,
                    letterSpacing:10,
                    fontSize:15,



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

    if (miGraficaTemp!=null){
        miGraficaTemp.destroy();
    }

    miGraficaTemp = new Chart(VistaMediciones.canvasTemperatura, {
        type: 'line',
        data: datosMedicionTemperatura,
        backgroundColor: 'white',
        options: opcionesGrafica

    });


}

function pintarGraficaHumedad() {
    var datos = [];
    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;
    var idSonda = document.getElementById("selectSondas").value;
    var fechaSelctor = document.getElementById("field1").value;

    data.forEach( element =>{
        if (element.id_parcela == idParcela && element.fecha === fechaSelctor && element.id_sonda == idSonda){
            datos.push(element);
        }
    });

    let listaLabelsHumedad = [];
    let listaDatosHumedad = [];
    datos.forEach(element => {
      if (element.tipoDato === "Humedad") {
            listaLabelsHumedad.push(formateraHora(element.hora))
        }
    });

    datos.forEach(element => {
        if (element.tipoDato === "Humedad") {
            listaDatosHumedad.push(element.medicion)
        }
    });


    let datosMedicionHumedad = {
        labels: listaLabelsHumedad,

        datasets: [
            {
                label: 'Humedad',

                data: listaDatosHumedad,
                pointBorderColor: 'white',
                backgroundColor: 'royalblue',
                borderColor: 'white',
                lineTension: 0,
                pointBackgroundColor: 'white',


            }

        ]
    };
    let opcionesHumedad = {
        maintainAspectRatio: false,
        legend:{
            labels:{
                fontColor:'white',
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '% Humedad',
                    fontColor:"white",

                },
                ticks: {
                    fontColor: "white",
                },
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            xAxes: [{
                scaleLabel:{
                    display: true,
                    labelString:'Hora',
                    fontColor:"white",
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

    if (miGraficaHum!=null){
        miGraficaHum.destroy();
    }

     miGraficaHum = new Chart(VistaMediciones.canvasHumedad, {
        type: 'line',
        data: datosMedicionHumedad,
        backgroundColor: 'white',
        options: opcionesHumedad

    });



}

function pintarGraficaSalinidad() {
    var datos = [];

    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;
    var idSonda = document.getElementById("selectSondas").value;
    var fechaSelctor = document.getElementById("field1").value;

    data.forEach( element =>{
        if (element.id_parcela == idParcela && element.fecha === fechaSelctor && element.id_sonda == idSonda){
            datos.push(element);
        }
    });
    let listaLabelsSalinidad = [];

    let listaDatosSalinidad = [];


    datos.forEach(element => {
         if (element.tipoDato === "Salinidad") {
            listaLabelsSalinidad.push(formateraHora(element.hora))
        }
    });

    datos.forEach(element => {
        if (element.tipoDato === "Salinidad") {
            listaDatosSalinidad.push(element.medicion)
        }
    });

    let datosMedicionSalinidad = {
        labels: listaLabelsSalinidad,
        datasets: [
            {
                label: 'Salinidad',

                data: listaDatosSalinidad,
                pointBorderColor: 'white',
                backgroundColo:'#408033',
                borderColor: 'white',
                lineTension: 0,
                pointBackgroundColor: 'white',



            }

        ]
    };
    let opcionesSalinidad = {
        maintainAspectRatio: false,

        legend:{
            labels:{
                fontColor:'white',
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '% Salinidad',
                    fontColor:"white",


                },
                ticks: {
                    fontColor: "white",
                    beginAtZero:true
                },
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            xAxes: [{
                scaleLabel:{
                    display: true,
                    labelString:'Hora',
                    fontColor:"white",
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

    if (miGraficaSal!= null){
        miGraficaSal.destroy();
    }

    miGraficaSal = new Chart(VistaMediciones.canvasSalinidad, {
        type: 'line',
        data: datosMedicionSalinidad,
        backgroundColor: 'white',
        options: opcionesSalinidad

    });
}
function pintarGraficas() {
    pintarGraficaTemperatura();
    /*
    //Solo pintaremos las graficas que tenga el checkbox seleccionado
    let variableCheck = document.getElementById("switchHumedad").checked;
    if (variableCheck){
        pintarGraficaHumedad();
    }
    variableCheck = document.getElementById("switchLuminosidad").checked;
    if (variableCheck){
        pintarGraficaLuminosidad();
    }

    variableCheck = document.getElementById("switchTemperatura").checked;
    if (variableCheck){
        pintarGraficaTemperatura();
    }
    variableCheck = document.getElementById("switchSalinidad").checked;
    if (variableCheck){
        pintarGraficaSalinidad();
    }
*/
}
function setDateToday() {
    let date = new Date();
    let month =(date.getMonth()+1).toString();
    if (month.length ===1){
        month = "0"+month;
    }
    let day =date.getDate().toString();
    if (day.length ===1){
        day = "0"+day;
    }
    document.getElementById("fechaInicio").value= date.getFullYear()+"-"+month+"-"+day;
}