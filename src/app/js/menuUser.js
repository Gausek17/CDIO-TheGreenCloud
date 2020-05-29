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
                <li class="navTiempo">
                  <a href="TiempoUser.html" class="itemNav"><i class="fas fa-cloud-sun"></i>Tiempo</span></a>
                </li>
            </ul>`;
    },
    sideNav: {},
    setSideNav: function (idSideNav){
        this.sideNav = document.getElementById(idSideNav);
    },
    crearSideNav: function () {
        this.sideNav.innerHTML = `<div class="headerMenu"><span class="menuTextAdmin">Admin Panel</span><span class="closebtn" onclick="closeNav()">&times;</span></div>
            <a id="b1" href="parcelasUser.html" class="itemMenu"><i class="fas fa-leaf"></i>Ver Parcelas</span></a>
            <a id="b2" href="graficasUser.html" class="itemMenu"><i class="fas fa-chart-bar"></i>Mediciones</span></a>
            <a id="b3" href="TiempoUser.html" class="itemMenu"><i class="fas fa-cloud-sun"></i>Tiempo</span></a>
           <div class="divCerrarSesion">
    <i class="iconCerrarSesionSideNav fas fa-sign-out-alt" onclick="deleteSesion()"></i>
    </div>`;
    }

};
