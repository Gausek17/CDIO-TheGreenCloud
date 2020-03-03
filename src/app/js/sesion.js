fetch('../api/v1.0/sesion').then(function (respuesta) {
    if(respuesta.status !== 200) {
        console.log("NO AUTORIZADO");
        location.href = '..';
    } else {
    }
})