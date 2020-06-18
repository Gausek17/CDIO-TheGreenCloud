

function modalAsignarParcelas(id_usuario) {
    let user = getUsuario(id_usuario);

    let stringPopUp = `
    <div class="w3-modal-content w3-card-4">
    
        <header class="headerParcelas"> 
        
        <span onclick="closeModal()"
              class="w3-button w3-large w3-display-topright">&times;</span>
            <h2 class="gestionParcelas">${user.nombre} - Gestión de Parcelas</h2>
            
        </header>
        <div class="contenidoPopupParcelas">
        <div class="menuParcelas"
        <navbar class="navbarParcela">
            
                         <div id="container2">
                            <form role="search" method="get" id="searchform2" action="">
                            <label for="s2">
                           <i class="icon-search"></i>
                                </label>
                    <input type="text" value="" placeholder="Buscar parcela" class="" id="buscadorParcela" />
                    <input type="hidden" id="id_usuario" name="id_usuario" value ="${id_usuario}" />
                     </form>
                    </div>
                
            </navbar>
             
        </div>
        <div class="containerListadoParcelas">
            <div class="listadoParcelas" id="listadoParcelas">
            <!--Listado de parcelas generado en JS -->  
            </div>
        </div>
    </div>
    </div>
    `;
    let element = document.getElementById("divPopup");
    element.innerHTML = stringPopUp;
    element.style.display = "block";
    document.getElementById("buscadorParcela").addEventListener('keyup',llenarDivParcelas);
    llenarDivParcelas();
}

function llenarDivParcelas() {
    let id_usuario = document.getElementById("id_usuario").value;
    let parcelas = ModeloParcelasAsignar.datos;
    let permisos = ModeloParcelasAsignar.permisosUsuario;
    let filtro = ModeloParcelasAsignar.modoVisiualizacion;
    let listaParcelas = [];
    let stringParcelas="";
    let texto = document.getElementById("buscadorParcela").value.toLowerCase();
    for (let i = 0; i<permisos.length;i++){
        if (permisos[i].id_usuario == id_usuario){
            listaParcelas.push(permisos[i].id_parcela);
        }
    }
    if(filtro ===0 || filtro ===1){
        for (let i =0; i <parcelas.length;i++){
            if (parcelas[i].nombre.toLowerCase().indexOf(texto) !== -1) {
                if (listaParcelas.includes(parcelas[i].id_parcela)){
                    stringParcelas+=`
            <div class="divParcelaAsignada">
                <span class="nameParcela">${parcelas[i].nombre}</span>
                <i class="fas fa-eye" id="vistaOn"></i><button class="desasignarParcela" alt="Elimina parcela" class="botonQuitar" onclick="desasignarParcela(${id_usuario}, ${parcelas[i].id_parcela})">Desasignar</button>
             </div>`;
                }
            }
        }
    }

    //Se utilizan dos for por separado para que primero aparezcan las asignadas y posteriormente las desasginadas
    if (filtro ===0 || filtro === 2){
        for (let i =0; i <parcelas.length;i++){
            if (parcelas[i].nombre.toLowerCase().indexOf(texto) !== -1) {
                if (!listaParcelas.includes(parcelas[i].id_parcela)){
                    stringParcelas+=`
            <div class="divParcelaDesasignada">
                <span class="nameParcela2">${parcelas[i].nombre}</span>
                <i class="fas fa-eye-slash" id="vistaOff"></i><button class="asignarParcela"  alt="Añade parcela" class="botonAñadir" onclick="asignarParcela(${id_usuario}, ${parcelas[i].id_parcela})">Asignar</button>
            </div>`;
                }
            }
        }
    }

    document.getElementById("listadoParcelas").innerHTML = stringParcelas;

}

function closeModal() {
    document.getElementById('divPopup').style.display = 'none'
}

function desasignarParcela(id_usuario, id_parcela) {

    var formData = new FormData();
    let jsonObject = {};
    formData.append("id_usuario", id_usuario);
    formData.append("id_parcela", id_parcela);
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    fetch('../api/v1.0/desasignarParcela', {
        method: 'delete',
        body: JSON.stringify(jsonObject)
    }).then(function (respuesta) {
        if (respuesta.status !== 200) {
           window.alert("Se ha producido un error para desasignar la parcela.")
        } else {
            ModeloParcelasAsignar.cargar(llenarDivParcelas);
        }

    });

}

function despliegueParcela() {
    let element =  document.getElementById("filtrosParcelas").style.display;
    if (element === "block"){
        ocultarDivFiltoParcela();
    }else{
        document.getElementById("filtrosParcelas").style.display  = "block";
    }

}
function cambiarModoParcelasAsignadas() {
    ModeloParcelasAsignar.modoVisiualizacion=1;

    ocultarDivFiltoParcela();
    llenarDivParcelas();
    document.getElementById("buttonFiltro").childNodes[0].nodeValue="Parcelas asignadas";
}

function cambiarModoParcelasNoAsignadas() {
    ModeloParcelasAsignar.modoVisiualizacion=2;
    ocultarDivFiltoParcela();
    llenarDivParcelas();
    document.getElementById("buttonFiltro").childNodes[0].nodeValue="Parcelas no asignadas";
}

function cambiarModoTodasParcelas() {
    ModeloParcelasAsignar.modoVisiualizacion=0;
    ocultarDivFiltoParcela();
    llenarDivParcelas();
    document.getElementById("buttonFiltro").childNodes[0].nodeValue="Todas las parcelas";
}

function ocultarDivFiltoParcela() {
    document.getElementById("filtrosParcelas").style.display = 'none';
}


function asignarParcela(id_usuario, id_parcela) {


    var formData = new FormData();
    formData.append("id_usuario", id_usuario);
    formData.append("id_parcela", id_parcela);
    fetch('../api/v1.0/asignarParcela', {
        method: 'post',
        body: formData
    }).then(function (respuesta) {
        if (respuesta.status !== 200) {
            window.alert("Se ha producido un error al asignar la parcela");
        } else {
            ModeloParcelasAsignar.cargar(llenarDivParcelas);

        }

    });

}

