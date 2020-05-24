let VistaMenu = {
    navAdmin : {},
    setNav: function(idNav){
        this.navAdmin = document.getElementById(idNav);
    },
    crearNav :function () {
        this.navAdmin.innerHTML = ` 
            <ul>
                <li class="navParcela">
                  <a href="parcelasUser.html" class="itemNav"><i class="fas fa-leaf"></i>Ver Parcelas</span></a>
                </li>
                <li class="navMediciones">
                  <a href="graficasUser.html" class="itemNav"><i class="fas fa-chart-bar"></i>Mediciones</span></a>
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
            <a id="b1" href="parcelasUser.html" class="itemMenu"><i class="fas fa-leaf"></i>Ver Parcelas</span></a>
            <a id="b2" href="graficasUser.html" class="itemMenu"><i class="fas fa-chart-bar"></i>Mediciones</span></a>
            <a id="a4" href="#" class="itemMenu"><img src="../imagenes/noticias/periodico-blanco.png" alt="Imagen Noticias" class="iconNoticias"><span class="menuText">Noticias</span></a>`;
    }
};

