var map;
var infoWindow;
var poligono;
var listaPoligonos=[];
var listaCentro = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0.25, lng: 0.25},
        zoom: 0,
        mapTypeId: 'hybrid',
        styles: [
            {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                stylers: [{visibility: 'off'}]
            }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
    });
    map.setTilt(0);
    iniciarCargaApp();

    infoWindow = new google.maps.InfoWindow();
}

function dibujarParcelas() {
    limpiarMapa();
    var idParcela;
    var parcela;
    var coordenadas;

    var listaOpciones = document.getElementById("selectParcelas").options;
    for (var i = 0; i < listaOpciones.length; i++) {
        idParcela = listaOpciones[i].value;
        parcela = getParcela(idParcela);
        coordenadas = getCoordendas(idParcela);
        dibujarParcela(coordenadas.coordenadas, parcela.color);
        listaCentro.push(coordenadas);
    }
    //Cambiar setCenter por posicion del Sensor
    map.setCenter(new google.maps.LatLng(listaCentro[0].coordenadas[0].lat,listaCentro[0].coordenadas[0].lng ) );
    map.setZoom(16);

}

function dibujarParcela(coordenadas, color) {
    let bounds = new google.maps.LatLngBounds();
    poligono = new google.maps.Polygon({
        paths: coordenadas,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.35,
        map: map
    });
    poligono.getPath().getArray().forEach(function (v) {
        bounds.extend(v);
    });

    listaPoligonos.push(poligono);
}

function limpiarMapa() {
    var i = 0;
    for (i; i < listaPoligonos.length; i++) {
        listaPoligonos[i].setMap(null);
    }
    listaPoligonos = [];
    listaCentro = [];
}

function cambiarCentro() {
    var idParcela = document.getElementById("selectParcelas").value;
    for (let i = 0; i<listaCentro.length; i++){
        if (listaCentro[i].id_parcela === idParcela){
            //Cambiar setCenter por posicion del Sensor
            map.setCenter(new google.maps.LatLng(listaCentro[i].coordenadas[0].lat,listaCentro[i].coordenadas[0].lng ) );
            map.setZoom(16);
        }
    }
}