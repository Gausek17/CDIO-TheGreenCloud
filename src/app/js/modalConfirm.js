function modalConfirmar(id){
    let stringPopUp = `
    <div class="w3-modal-content w3-card-4">
        <header class="w3-container w3-teal"> 
        <span onclick="closeModal()"
              class="w3-button w3-large w3-display-topright">&times;</span>
            <h2>¿Estas seguro?</h2>
        </header>
        <div class="w3-container">
            <p>El elemento se borrara permanentemente</p>
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

//onclick="optionConfirm(${id})"
function optionConfirm(id) {
    deleteUser(id);
    closeModal();

}