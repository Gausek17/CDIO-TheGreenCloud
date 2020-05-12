

function modalAsignarParcelas(id_usuario) {
    let user = getUsuario(id_usuario);

    let stringPopUp = `
    <div class="w3-modal-content w3-card-4">
    
        <header class="headerParcelas"> 
        
        <span onclick="closeModal()"
              class="w3-button w3-large w3-display-topright">&times;</span>
            <h2 class="gestionParcelas">Gestión de Parcelas - ${user.nombre}</h2>
            
        </header>
        <div class="contenidoPopupParcelas">
        <div class="menuParcelas"
        <navbar class="navbarParcela">
                <form class="form-inline">
                    <input class="form-control-parcelas mr-sm-2" type="search" placeholder="Parcela" id="buscadorParcela"><img src="../imagenes/admin/lupa.png" alt="buscaParcela" class="iconLupa">
                    <input type="hidden" id="id_usuario" name="id_usuario" value ="${id_usuario}" />
                </form>
            </navbar>
            <div class="navParcelas">
                <button class="desplegarParcelas" onclick="despliegueParcela()" id="buttonFiltro">Todas las parcelas</button>
                <div class="filtrosParcelas" id="filtrosParcelas">
                    <button class="todasParcelas" onclick="cambiarModoTodasParcelas()">Todas las parcelas</button>
                    <button class="misParcelas" onclick="cambiarModoParcelasAsignadas()">Parcelas asignadas</button>
                    <button class="buttonParcelasNoAsignadas" onclick="cambiarModoParcelasNoAsignadas()">Parcelas no asignadas</button>
                </div>
            </div>    
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
                <img src="../imagenes/admin/DesasignarParcela.png" alt="Elimina parcela" class="iconDesasignar" onclick="desasignarParcela(${id_usuario}, ${parcelas[i].id_parcela})">
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
                <span class="nameParcela">${parcelas[i].nombre}</span>
                <img src="../imagenes/admin/AsignarParcela.png" alt="Añade parcela" class="iconAsignar" onclick="asignarParcela(${id_usuario}, ${parcelas[i].id_parcela})">
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

