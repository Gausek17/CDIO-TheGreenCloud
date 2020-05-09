function modalEdit(id){
    let stringPopUp = `
    <div class="w3-modal-content w3-card-4">
    
        <header class="headerParcelas"> 
        
        <span onclick="closeModal()"
              class="w3-button w3-large w3-display-topright">&times;</span>
            <h2 class="gestionParcelas">Gestión de Parcelas</h2>
            
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
        <div class="listadoParcelas">
            <div class="divParcelaAsignada">
        <span class="nameParcela">-Parcela de limones</span>
        <img src="../imagenes/admin/DesasignarParcela.png" alt="Elimina parcela" class="iconDesasignar">
        
    </div>
     <div class="divParcelaAsignada">
        <span class="nameParcela">-Parcela de limones</span>
        <img src="../imagenes/admin/DesasignarParcela.png" alt="Elimina parcela" class="iconDesasignar">
        
    </div>
     <div class="divParcelaAsignada">
        <span class="nameParcela">-Parcela de limones</span>
        <img src="../imagenes/admin/DesasignarParcela.png" alt="Elimina parcela" class="iconDesasignar">
        
    </div>
     <div class="divParcelaAsignada">
        <span class="nameParcela">-Parcela de limones</span>
        <img src="../imagenes/admin/DesasignarParcela.png" alt="Elimina parcela" class="iconDesasignar">
        
    </div>
    <div class="divParcelaDesasignada">
     <span class="nameParcela">-Parcela de Patatas</span>
        <img src="../imagenes/admin/AsignarParcela.png" alt="Añade parcela" class="iconAsignar">
    </div>
            
        </div>
    </div>
    </div>
    `;
    let element = document.getElementById("divPopup");
    element.innerHTML = stringPopUp;
    element.style.display = "block";
}

function closeModal() {
    document.getElementById('divPopup').style.display='none'
}


function optionConfirm(id) {
    deleteUser(id);
    closeModal();
}

function despliegueParcela(){
    document.getElementById("filtrosParcelas").style.display='block';
}