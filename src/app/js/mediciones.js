let ModeloMediciones = {
    datos : [],

    cargar : function () {


        fetch('../api/v1.0/mediciones').then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) =>{
            this.datos = datosJson;
            console.log (datosJson);
            this.controlador.representarGrafica();

        });
    },
    controlador : {}
};


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
    representarGrafica: function (datos) {
        console.log("-------------");
        // console.log(datos);
        let listaLabelsTemperatura = [];
        let listaLabelsLuminosidad = [];
        let listaLabelsHumedad = [];
        let listaLabelsSalinidad = [];
        datos.forEach(element => {
            if (element.id_sonda == 1) {
                var time=new Date(element.hora);
                var horaFormateada=time.getHours()+":"+time.getMinutes();
                listaLabelsTemperatura.push(horaFormateada)

            } else if (element.id_sonda == 2) {
                listaLabelsLuminosidad.push(element.hora)
            } else if (element.id_sonda == 3) {
                listaLabelsHumedad.push(element.hora)
            } else if (element.id_sonda == 4) {
                listaLabelsSalinidad.push(element.hora)
            }
        })


        let listaDatosTemperatura = [];
        let listaDatosLuminosidad = [];
        let listaDatosHumedad = [];
        let listaDatosSalinidad = [];
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
            })

    
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

        let miGraficaTemp = new Chart(this.canvasTemperatura, {
            type: 'line',
            data: datosMedicionTemperatura,
            backgroundColor: 'white',
            options: opcionesTemperatura

        });
        let miGraficaLum = new Chart(this.canvasLuminosidad, {
            type: 'line',
            data: datosMedicionLuminosidad,
            backgroundColor: 'white',
            options: opcionesLuminosidad

        });
        let miGraficaHum = new Chart(this.canvasHumedad, {
            type: 'line',
            data: datosMedicionHumedad,
            backgroundColor: 'white',
            options: opcionesHumedad

        });
        let miGraficaSal = new Chart(this.canvasSalinidad, {
            type: 'line',
            data: datosMedicionSalinidad,
            backgroundColor: 'white',
            options: opcionesSalinidad

        });
    }
}
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
    if(checked==true){
        document.getElementById(id).style.display="block";
    }
    else {
        document.getElementById(id).style.display="none";
    }

}
