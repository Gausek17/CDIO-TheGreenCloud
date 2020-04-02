let VistaMenu = {
    navAdmin : {},
    setNav: function(idNav){
        this.navAdmin = document.getElementById(idNav);
    },
    crearNav :function () {
        this.navAdmin.innerHTML = `  <p class="textAdmin">User Panel</p>
            <ul>
                <li class="navParcela">
                  <a href="ParcelasUser.php" class="itemNav"><img src="../imagenes/menu/IconoCampo-White.png" alt="Imagen Campo" class="iconParcelas"><span class="textNav">Parcela</span></a>
                </li>
                <li class="navMediciones">
                  <a href="graficasUser.html" class="itemNav"><img src="../imagenes/menu/sensor.png" alt="Imagen Sensor" class="iconMediciones"><span class="textNav">Mediciones</span></a>
                 </li>
            </ul>`;
    },
    sideNav: {},
    setSideNav: function (idSideNav){
        this.sideNav = document.getElementById(idSideNav);
    },
    crearSideNav: function () {
        this.sideNav.innerHTML = `<div class="headerMenu"><span class="menuTextAdmin">Admin Panel</span><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
            <a href="ParcelasUser.php" class="itemMenu"><img src="../imagenes/menu/IconoCampo-White.png" alt="Imagen Campo" class="iconParcelas"><span class="menuText">Parcelas</span></a>
            <a href="graficasUser.html" class="itemMenu"><img src="../imagenes/menu/sensor.png" alt="Imagen Sensor" class="iconMediciones"><span class="menuText">Mediciones</span></a>`;
    }
};

