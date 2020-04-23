fetch('api/v1.0/sesion', {method:'get'}).then(function (respuesta) {
    //Si el usuario ya ha iniciado sesion, se le redigira  a su pagina correspondiente
        if(respuesta.status === 200 ){
            respuesta.json().then(value =>{
                if(value[0].id_rol === "1"){
                    location.href='./app';
                }else if(value[0].id_rol ==="2"){
                    location.href='./app/parcelasUser.html';
                }
            });
        }

});