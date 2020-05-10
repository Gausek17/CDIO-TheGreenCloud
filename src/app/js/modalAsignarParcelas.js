

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
                </form>
            </navbar>
            <div class="navParcelas">
            <button class="desplegarParcelas" onclick="despliegueParcela()">Parcelas
            </button>
            <div class="filtrosParcelas" id="filtrosParcelas">
            <button class="misParcelas" onclick="">Mis parcelas</button>
            <button class="todasParcelas" onclick="">Todas las parcelas</button>
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

    llenarDivParcelas(id_usuario);
}

function llenarDivParcelas(id_usuario) {
    let parcelas = ModeloParcelasAsignar.datos;
    let permisos = ModeloParcelasAsignar.permisosUsuario;
    let listaParcelas = [];
    let stringParcelas="";

    for (let i = 0; i<permisos.length;i++){
        if (permisos[i].id_usuario == id_usuario){
            listaParcelas.push(permisos[i].id_parcela);
        }
    }

    for (let i =0; i <parcelas.length;i++){
        if (listaParcelas.includes(parcelas[i].id_parcela)){
            stringParcelas+=`
            <div class="divParcelaAsignada">
                <span class="nameParcela">${parcelas[i].nombre}</span>
                <img src="../imagenes/admin/DesasignarParcela.png" alt="Elimina parcela" class="iconDesasignar">
             </div>`;
        }
    }
    for (let i =0; i <parcelas.length;i++){
        if (!listaParcelas.includes(parcelas[i].id_parcela)){
            stringParcelas+=`
            <div class="divParcelaDesasignada">
                <span class="nameParcela">${parcelas[i].nombre}</span>
                <img src="../imagenes/admin/AsignarParcela.png" alt="Añade parcela" class="iconAsignar">
            </div>`;
        }
    }
    document.getElementById("listadoParcelas").innerHTML = stringParcelas;


}

function closeModal() {
    document.getElementById('divPopup').style.display = 'none'
}


function optionConfirm(id) {
    deleteUser(id);
    closeModal();
}

function despliegueParcela() {
    document.getElementById("filtrosParcelas").style.display = 'block';
}

