//------------------------------------------
//script para el boton de back to top
//------------------------------------------

//Conectar con el boton:
mybutton = document.getElementById("miBoton");

// Que el boton se muestre una vez bajes una cierta distancia
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Que cuando se pulse el boton suba arriba
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
