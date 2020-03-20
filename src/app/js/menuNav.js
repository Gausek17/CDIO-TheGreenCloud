
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.7)"
    var lista = document.getElementsByClassName("divPerson");
    for (let i = 0; i<lista.length; i++){
        lista[i].style.opacity = "0.5";
    }
    document.getElementById("panelActual").style.opacity = "0.5";
}


function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
    var lista = document.getElementsByClassName("divPerson");
    for (let i = 0; i<lista.length; i++){
        lista[i].style.opacity = "1";
    }
    document.getElementById("panelActual").style.opacity = "1";
}
