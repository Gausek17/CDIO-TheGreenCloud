fetch('../api/v1.0/sesion', {method:'get'}).then(function (respuesta) {
    if(respuesta.status !== 200) {
        location.href = '..';
    } else {

    }
});