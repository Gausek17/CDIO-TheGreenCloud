let VistaMenu = {
    navAdmin : {},
    setNav: function(idNav){
        this.navAdmin = document.getElementById(idNav);
    },
    crearNav :function () {
        this.navAdmin.innerHTML = `<p class="textAdmin">Admin Panel</p>
    <ul>
        <li class="navParcela">
            <a href="parcelasAdmin.html" class="itemNav"><img src="../imagenes/menu/IconoCampo-White.png" alt="Imagen Campo" class="iconParcelas"><span class="textNav">Parcelas</span></a>
        </li>
        <li class="navUsuarios">
            <a href="index.html" class="itemNav"><img src="../imagenes/menu/groupIcon-White.png" alt="Gestión Usuarios" class="iconGestionUsuarios"><span class="textNav">Gestión Usuarios</span></a>
        </li>
        <li class="navMediciones">
                  <a href="graficasAdmin.html" class="itemNav"><img src="../imagenes/menu/sensor.png" alt="Imagen Sensor" class="iconMediciones"><span class="textNav">Mediciones</span></a>
        </li>
    </ul>`;
    },
    sideNav: {},
    setSideNav: function (idSideNav){
        this.sideNav = document.getElementById(idSideNav);
    },
    crearSideNav: function () {
        this.sideNav.innerHTML = `<div class="headerMenu"><span class="menuTextAdmin">Admin Panel</span><a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a></div>
            <a href="parcelasAdmin.html" class="itemMenu"><img src="../imagenes/menu/IconoCampo-White.png" alt="imagenCampo" class="iconParcelas"><span class="menuText">Parcelas</span></a>
            <a href="index.html" class="itemMenu"><img src="../imagenes/menu/groupIcon-White.png" alt="Imagen Usuarios" class="iconGestionUsuarios"><span class="menuText">Gestión Usuarios</span></a>
            <a href="graficasAdmin.html" class="itemMenu"><img src="../imagenes/menu/sensor.png" alt="Imagen Sensor" class="iconMediciones"><span class="menuText">Mediciones</span></a>`;
    }
};

