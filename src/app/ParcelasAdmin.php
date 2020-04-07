<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>AdminSection</title>
    <link rel="stylesheet" type="text/css" href="css/estilo_parcelas.css">
    <link rel="stylesheet" type="text/css" href="css/estilo_menu.css">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="js/sesion_permisos.js"></script>
</head>
<body>

<div class="container" id="container">
    <div id="mySidenav" class="sidenav">
        <!-- Nav generado en js-->
    </div>
    <header>
        
        <img onclick="openNav()" src="../imagenes/menu/iconMenu.png" alt="Menu" class="iconMenu">
        <img class="logoGTI" src="../imagenes/logoGTI.svg" onclick="location.href='../index.html'">
        <div class="divUsuario">
            <p id="textNombreUsuario">Nombre Usuario</p>
            
            <img src="../imagenes/parcelas/logout.svg" class="cerrar_sesion" alt="Icono Cerrar sesion" onclick="deleteSesion()" >
        </div>
    </header>
    <div class="divCentral">
        <nav id="navGeneral">
            <!-- Nav generado en js-->
        </nav>
        <div class="divContenido">
            <div class="panelActual" id="panelActual">
                <img src="../imagenes/parcelas/IconoCampo-White.png" alt="Gestión Usuarios" class="iconParcelasSelected"> Parcelas
            </div>
            
            <div class="divSeleccionParcela">
                <div class = "divTextSeleccionParcela">
                    <img src="../imagenes/parcelas/icono-maps.png" alt="Añadir usuario" class="iconSeleccionParcela">
                    <p class="textSeleccionParcela">Seleccione una parcela:</p>
                </div>
               <section class="seleccion">
                  <!--
                  <label><select id="usuario">
                           <option selected="selected" value="-10">Seleccione un usuario</option>
                       </select></label>
                  -->

                   <label ><select id="parcela" onchange="dibujarParcelas()"  >
            <option selected="selected"  value="-10" onclick="removeLine()">Todos</option>
            <?php
            include '../api/includes/conexion.php';
            session_start();
            $id = $_SESSION['usuario']['id_usuario'];
            $consulta="SELECT p.id_parcela as id_parcela, p.color as color, p.id_campo as id_campo, p.nombre as nombre, c.id_coordenada as id_coordenda, c.latitud as latitud, c.longitud as longitud from parcela p
                           INNER JOIN coordenadas c 
                           ON p.id_parcela = c.id_parcela
                           INNER JOIN permisos_usuarios pu
                           ON pu.id_parcela=p.id_parcela
                           WHERE pu.id_usuario='$id'";
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
                 </section>  
                 
                <section class="no-selectores-header">
                <section class="button">
                
                </section>
                <section ><a href="graficasAdmin.html" ><img src="../imagenes/parcelas/report.png" alt="icono graficas" class="enlace-graficas"></a></section>
                </section>
            </div>
            
            <div class="divContenidoUser">
<div id="map">

</div>

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
<script src="https://maps.googleapis.com/maps/api/js?callback=initMap" async defer>
</script>
                

                
                </div>
            </div>
        </div>
    </div>
<script src="js/usuarioLogin.js"></script>
<script src="js/menuAdmin.js"></script>
<script src="js/sideNav.js"></script>

<script src="js/usuarios_select.js"></script>
<script>
    VistaUsuarioLogin.iniciar("textNombreUsuario");
    ControladorUsuarioLogin.iniciar();

    VistaMenu.setNav("navGeneral");
    VistaMenu.crearNav();
    VistaMenu.setSideNav("mySidenav");
    VistaMenu.crearSideNav();

    VistaSelectUsuarios.iniciar("usuario");
    ControladorSelectUsuarios.iniciar();
</script>
</body>
</html>