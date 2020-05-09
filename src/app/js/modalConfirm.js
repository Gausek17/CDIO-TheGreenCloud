function modalConfirmar(id){
    let stringPopUp = `
    <div class="w3-modal-content w3-card-4">
        <header class="w3-container w3-teal"> 
        <span onclick="closeModal()"
              class="w3-button w3-large w3-display-topright">&times;</span>
            <h2>¿Estas seguro?</h2>
            
        </header>
        
        <div class="w3-container">
            <p>El usuario se borrará permanentemente</p>
            <button class="botonConfirm" alt="Confirm" onclick="optionConfirm(${id})">Confirmar</button>
            <button class="botonCancel" alt="Cancel" onclick="closeModal()">Cancelar</button>
            
        </div>
    </div>
    `;
    let element = document.getElementById("divPopup");
    element.innerHTML = stringPopUp;
    element.style.display = "block";
}

function modalAviso(texto,header) {
    let stringPopUp = `
    <div class="w3-modal-content w3-card-4">
        <header class="w3-container w3-teal"> 
        <span onclick="closeModal()"
              class="w3-button w3-large w3-display-topright">&times;</span>
            <h2>${header}</h2>
            
        </header>
        
        <div class="w3-container">
            <p>${texto}</p>
            <button class="botonCancel" alt="Cancel" onclick="closeModal()">Aceptar</button>
            
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

//Modal que cuando lo cerreamos vuelve al login
function modalAvisoBackToLogin(texto,header) {
    let stringPopUp = `
    <div class="w3-modal-content w3-card-4">
        <header class="w3-container w3-teal"> 
        <span onclick="closeModalBackToLogin()"
              class="w3-button w3-large w3-display-topright">&times;</span>
            <h2>${header}</h2>
            
        </header>
        
        <div class="w3-container">
            <p>${texto}</p>
            <button class="botonCancel" alt="Cancel" onclick="closeModalBackToLogin()">Aceptar</button>
            
        </div>
    </div>
    `;
    let element = document.getElementById("divPopup");
    element.innerHTML = stringPopUp;
    element.style.display = "block";
}

function closeModalBackToLogin() {
    document.getElementById('divPopup').style.display='none';
    location.href='./login.html';
}