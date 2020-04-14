let ModeloMediciones = {
    datos : [],

    cargar : function () {


        fetch('../api/v1.0/mediciones').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datos = datosJson;
            console.log(datosJson);
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

function mostrarOcultar(checked, idcanvas) {
    var id="";
    switch (idcanvas) {
        case "switchTemperatura":
            id="chartTemperatura";
            break;
        case "switchLuminosidad":
            id="chartLuminosidad";
            break;
        case "switchHumedad":
            id="chartHumedad";
            break;
        case "switchSalinidad":
            id="chartSalinidad";
            break;
    }
    if(checked===true){
        document.getElementById(id).style.display="block";
        switch (id) {
            case "chartTemperatura":
                pintarGraficaTemperatura();
                break;
            case "chartLuminosidad":
                pintarGraficaLuminosidad();
                break;
            case "chartHumedad":
                pintarGraficaHumedad();
                break;
            case "chartSalinidad":
                pintarGraficaSalinidad();
                break;
        }
    }
    else {
        document.getElementById(id).style.display="none";
    }

}

function pintarGraficaLuminosidad(){
    var datos = [];

    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;

    data.forEach( element =>{
        if (element.id_parcela == idParcela){
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

    let miGraficaLum = new Chart(VistaMediciones.canvasLuminosidad, {
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

    data.forEach( element =>{
        if (element.id_parcela == idParcela){
            datos.push(element);
        }
    });
    
    let listaLabelsTemperatura = [];
    let listaDatosTemperatura = [];
    
    datos.forEach(element => {
        if (element.tipoDato === "Temperatura") {
            listaLabelsTemperatura.push(formateraHora(element.hora))

        }
    });

    datos.forEach(element => {
        if (element.tipoDato === "Temperatura") {
            listaDatosTemperatura.push(element.medicion)
        }
    });


    let datosMedicionTemperatura = {
        labels: listaLabelsTemperatura,

        datasets: [
            {
                label: 'Temperatura',

                data: listaDatosTemperatura,
                pointBorderColor: 'white',
                backgroundColor: 'orange',
                borderColor: 'white',
                lineTension: 0,
                pointBackgroundColor: 'white',


            }

        ]
    };
    let opcionesTemperatura = {
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
                    labelString: 'Temperatura ºC',
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



    let miGraficaTemp = new Chart(VistaMediciones.canvasTemperatura, {
        type: 'line',
        data: datosMedicionTemperatura,
        backgroundColor: 'white',
        options: opcionesTemperatura

    });


}

function pintarGraficaHumedad() {
    var datos = [];
    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;
    data.forEach( element =>{
        if (element.id_parcela == idParcela){
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



    let miGraficaHum = new Chart(VistaMediciones.canvasHumedad, {
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

    data.forEach( element =>{
        if (element.id_parcela == idParcela){
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

    let miGraficaSal = new Chart(VistaMediciones.canvasSalinidad, {
        type: 'line',
        data: datosMedicionSalinidad,
        backgroundColor: 'white',
        options: opcionesSalinidad

    });
}
function pintarGraficas() {

    pintarGraficaHumedad();
    pintarGraficaLuminosidad();
    pintarGraficaTemperatura();
    pintarGraficaSalinidad();
}

/*
function pintarGraficas() {

    var datos = [];

    var data = ModeloMediciones.datos;
    var idParcela = document.getElementById("selectParcelas").value;

    data.forEach( element =>{
        if (element.id_parcela == idParcela){
            datos.push(element);
        }
    });


    let listaLabelsTemperatura = [];
    let listaLabelsLuminosidad = [];
    let listaLabelsHumedad = [];
    let listaLabelsSalinidad = [];

    let listaDatosTemperatura = [];
    let listaDatosLuminosidad = [];
    let listaDatosHumedad = [];
    let listaDatosSalinidad = [];


    datos.forEach(element => {
        if (element.id_sonda == 1) {
            listaLabelsTemperatura.push(formateraHora(element.hora))

        } else if (element.id_sonda == 2) {
            listaLabelsLuminosidad.push(formateraHora(element.hora))
        } else if (element.id_sonda == 3) {
            listaLabelsHumedad.push(formateraHora(element.hora))
        } else if (element.id_sonda == 4) {
            listaLabelsSalinidad.push(formateraHora(element.hora))
        }
    });

    datos.forEach(element => {
        if (element.id_sonda == 1) {
            listaDatosTemperatura.push(element.medicion)
        } else if (element.id_sonda == 2) {
            listaDatosLuminosidad.push(element.medicion)
        } else if (element.id_sonda == 3) {
            listaDatosHumedad.push(element.medicion)
        } else if (element.id_sonda == 4) {
            listaDatosSalinidad.push(element.medicion)
        }
    });


    let datosMedicionTemperatura = {
        labels: listaLabelsTemperatura,

        datasets: [
            {
                label: 'Temperatura',

                data: listaDatosTemperatura,
                pointBorderColor: 'white',
                backgroundColor: 'orange',
                borderColor: 'white',
                lineTension: 0,
                pointBackgroundColor: 'white',


            }

        ]
    };
    let opcionesTemperatura = {
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
                    labelString: 'Temperatura ºC',
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


    let miGraficaTemp = new Chart(VistaMediciones.canvasTemperatura, {
        type: 'line',
        data: datosMedicionTemperatura,
        backgroundColor: 'white',
        options: opcionesTemperatura

    });
    let miGraficaLum = new Chart(VistaMediciones.canvasLuminosidad, {
        type: 'line',
        data: datosMedicionLuminosidad,
        backgroundColor: 'white',
        options: opcionesLuminosidad

    });
    let miGraficaHum = new Chart(VistaMediciones.canvasHumedad, {
        type: 'line',
        data: datosMedicionHumedad,
        backgroundColor: 'white',
        options: opcionesHumedad

    });
    let miGraficaSal = new Chart(VistaMediciones.canvasSalinidad, {
        type: 'line',
        data: datosMedicionSalinidad,
        backgroundColor: 'white',
        options: opcionesSalinidad

    });

}

 */
