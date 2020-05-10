let VistaMenu = {
    navAdmin : {},
    setNav: function(idNav){
        this.navAdmin = document.getElementById(idNav);
    },
    crearNav :function () {
        this.navAdmin.innerHTML = ` 
            <ul>
                <li class="navParcela">
                  <a href="parcelasUser.html" class="itemNav"><img src="../imagenes/menu/IconoCampo-White.png" alt="Imagen Campo" class="iconParcelas"><span class="textNav">Parcela</span></a>
                </li>
                <li class="navMediciones">
                  <a href="graficasUser.html" class="itemNav"><img src="../imagenes/menu/sensor.png" alt="Imagen Sensor" class="iconMediciones"><span class="textNav">Mediciones</span></a>
                 </li>
                <li class="navNoticias">
                  <a href="noticias.html" class="itemNav"><img src="../imagenes/noticias/periodico-blanco.png" alt="Imagen Sensor" class="iconNoticias"><span class="textNav">Noticias</span></a>
                </li>
            </ul>`;
    },
    sideNav: {},
    setSideNav: function (idSideNav){
        this.sideNav = document.getElementById(idSideNav);
    },
    crearSideNav: function () {
        this.sideNav.innerHTML = `<div class="headerMenu"><span class="menuTextAdmin">User Panel</span><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
            <a id="b1" href="parcelasUser.html" class="itemMenu"><img src="../imagenes/menu/IconoCampo-White.png" alt="Imagen Campo" class="iconParcelas"><span class="menuText">Parcelas</span></a>
            <a id="b2" href="graficasUser.html" class="itemMenu"><img src="../imagenes/menu/sensor.png" alt="Imagen Sensor" class="iconMediciones"><span class="menuText">Mediciones</span></a>
            <a id="a4" href="#" class="itemMenu"><img src="../imagenes/noticias/periodico-blanco.png" alt="Imagen Noticias" class="iconNoticias"><span class="menuText">Noticias</span></a>`;
    }
};

