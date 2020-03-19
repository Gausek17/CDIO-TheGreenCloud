<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Alumnos</title>
    <style>
        #map {
            width: 960px;
            height: 50vh;
            border: solid 1px black;
        }
    </style>


    <script>





    </script>
</head>
<body>
<div id="map">   </div>


<div id="divCLientes">
    <label ><select id="parcela" onchange="dibujarParcelas()"  >
            <option selected="selected"  value="-10" onclick="removeLine()">Todos</option>
            <?php
            include 'conexion.php';
            
            $consulta='SELECT * from parcela p
                           INNER JOIN coordenadas c 
                           ON p.id_parcela = c.id_parcela';
            $ejecutar=mysqli_query($conexion,$consulta);


            $idInicial =1;
            $arrayVertices = array();
            $vertice = array();
            $idLISTA ="1";
            foreach ($ejecutar as $opciones):
                $idNuevo = $opciones['id_parcela'];

                if ($idInicial==$idNuevo){


                    $coord= (object) [
                        'lat' => $opciones['latitud'],
                        'lng' => $opciones['longitud']
                    ];


                    array_push($vertice, $coord);
                }else{


                    $arrayVertices["$idLISTA"] = $vertice;
                    $idInicial=$idNuevo;
                    $idLISTA =$opciones['id_parcela']."";
                    $coord= (object) [
                        'lat' => $opciones['latitud'],
                        'lng' => $opciones['longitud']
                    ];
                    $vertice = array();
                    array_push($vertice, $coord);


                }


            endforeach;
            $arrayVertices["$idLISTA"] = $vertice;
            
            $idInicial =-1;
            foreach ($ejecutar as $opciones):


                $idNuevo = $opciones['id_parcela'];
            if ($idInicial!=$idNuevo){
                $idLISTA =  $opciones['id_parcela'];
                $object = (object) [
                    'id' => $opciones['id_parcela'],
                    'color' => $opciones['color'],
                    'nombre' => $opciones['nombre'],
                    'vertices'=>$arrayVertices["$idLISTA"]
                ];
                $idInicial=$idNuevo;
               
                ?>


                <option value="<?= htmlspecialchars(json_encode($object))?>"> <?php echo $opciones['nombre'];} ?> </option>





            <?php


            endforeach;
            ?>
            <script>
                 
            </script>

        </select></label>
    <input id="botonBorrar" type="button" onclick="removeLine();" value="LIMPIAR MAPA">





</div>
<!-- ///////////////////////////////////////////////////////////////-->
<script>

    var map;
    var infoWindow;
    var poligono;
    var listaPoligonos = [];
    var listaCentro= [];

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


        infoWindow = new google.maps.InfoWindow();

        dibujarParcelas();
        
         map.setCenter(new google.maps.LatLng(listaCentro[0].lat,listaCentro[0].lng));
         map.setZoom(14);
       // console.log(listaCentro[0])
        
        


    }
    function dibujarParcelas(){

        var dibujo = JSON.parse(document.getElementById("parcela").value);
        var listaOpciones = document.getElementById("parcela").options;
        
        if(dibujo == -10){
            for (var i=1; i<listaOpciones.length; i++){

                var dibujoTMP=JSON.parse(listaOpciones[i].value);
                
                var listaBuena = numerarLista(dibujoTMP.vertices);
                
                let bounds = new google.maps.LatLngBounds();
                poligono = new google.maps.Polygon({
                    paths: listaBuena,
                    strokeColor: dibujoTMP.color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: dibujoTMP.color,
                    fillOpacity: 0.35,
                    map: map
                });

                listaPoligonos.push(poligono);
                poligono.getPath().getArray().forEach(function (v) {
                    bounds.extend(v);
                });
            }
            
            
            map.setCenter(new google.maps.LatLng(listaBuena[0].lat,listaBuena[0].lng));
            map.setZoom(14);
            
            
        }else{
            var listaBuena = numerarLista(dibujo.vertices);



            let bounds = new google.maps.LatLngBounds();
            poligono = new google.maps.Polygon({
                paths: listaBuena,
                strokeColor: dibujo.color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: dibujo.color,
                fillOpacity: 0.35,
                map: map
            });

            listaPoligonos.push(poligono);
            poligono.getPath().getArray().forEach(function (v) {
                bounds.extend(v);
            });
            map.setCenter(new google.maps.LatLng(listaBuena[0].lat,listaBuena[0].lng ) );
            map.setZoom(16);
        }



        function numerarLista(listaStrings){
            var listaFinal = [];


            for(var i =0 ; i <listaStrings.length;i++){
                //console.log(listaStrings[i].lat) ;
                var objeto = {
                    lat :parseFloat(listaStrings[i].lat),
                    lng :parseFloat(listaStrings[i].lng)
                }
                listaFinal.push(objeto);
            }
            return listaFinal;


        }

        for(var i =0 ;i<listaBuena.length;i++){
            listaCentro.push(listaBuena[i]);
        
        }
        

    }
    ////////////////////////////////////////////////////////////////
    function removeLine() {

        var i =0 ;
        for(i;i<listaPoligonos.length;i++){
            listaPoligonos[i].setMap(null);
        }

    }

</script>


<!--en key hay que poner la clave de la api , y en callback la funcion de javascript que quiero que se ejecute-->
<script
    src="https://maps.googleapis.com/maps/api/js?callback=initMap"
    async defer>
</script>





</body>
</html>