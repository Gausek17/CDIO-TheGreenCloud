-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2020 a las 16:15:28
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_tgc`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campo`
--

CREATE TABLE `campo` (
  `id_campo` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `id_cliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `campo`
--

INSERT INTO `campo` (`id_campo`, `nombre`, `id_cliente`) VALUES
(1, 'Campo ', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `telefono` varchar(12) DEFAULT NULL,
  `mail` varchar(60) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `telefono`, `mail`, `password`) VALUES
(1, 'Bancal', '655 555 555', 'bancales@bancal.es', '1234'),
(3, 'AlCampo', '666 666 666', 'alcampo.gerente@alcampo.es', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordenadas`
--

CREATE TABLE `coordenadas` (
  `id_coordenada` int(11) NOT NULL,
  `latitud` float DEFAULT NULL,
  `longitud` float DEFAULT NULL,
  `id_parcela` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `coordenadas`
--

INSERT INTO `coordenadas` (`id_coordenada`, `latitud`, `longitud`, `id_parcela`) VALUES
(1, 63.8298, -22.6958, 1),
(2, 63.8298, -22.6981, 1),
(3, 63.8283, -22.6982, 1),
(4, 63.8281, -22.6933, 1),
(5, 63.8251, -22.7042, 2),
(6, 63.826, -22.6991, 2),
(7, 63.825, -22.6971, 2),
(8, 63.8239, -22.703, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicion`
--

CREATE TABLE `medicion` (
  `id_medicion` int(11) NOT NULL,
  `medicion` varchar(40) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `id_parcela` int(11) DEFAULT NULL,
  `id_sonda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medicion`
--

INSERT INTO `medicion` (`id_medicion`, `medicion`, `fecha`, `hora`, `id_parcela`, `id_sonda`) VALUES
(1, '13', '2020-03-11', '01:00:00', 2, 1),
(2, '12', '2020-03-11', '02:00:00', 2, 1),
(3, '12', '2020-03-11', '03:00:00', 2, 1),
(4, '11', '2020-03-11', '04:00:00', 2, 1),
(5, '14', '2020-03-11', '05:00:00', 2, 1),
(6, '15', '2020-03-11', '06:00:00', 2, 1),
(7, '16', '2020-03-11', '07:00:00', 2, 1),
(8, '17', '2020-03-11', '08:00:00', 2, 1),
(9, '17', '2020-03-11', '09:00:00', 2, 1),
(10, '18', '2020-03-11', '10:00:00', 2, 1),
(11, '21', '2020-03-11', '11:00:00', 2, 1),
(12, '22', '2020-03-11', '12:00:00', 2, 1),
(13, '23', '2020-03-11', '13:00:00', 2, 1),
(14, '23', '2020-03-11', '14:00:00', 2, 1),
(15, '23', '2020-03-11', '15:00:00', 2, 1),
(16, '22', '2020-03-11', '16:00:00', 2, 1),
(17, '23', '2020-03-11', '17:00:00', 2, 1),
(18, '21', '2020-03-11', '18:00:00', 2, 1),
(19, '19', '2020-03-11', '19:00:00', 2, 1),
(20, '18', '2020-03-11', '20:00:00', 2, 1),
(21, '16', '2020-03-11', '21:00:00', 2, 1),
(22, '15', '2020-03-11', '22:00:00', 2, 1),
(23, '14', '2020-03-11', '23:00:00', 2, 1),
(24, '13', '2020-03-11', '00:00:00', 2, 1),
(25, '0', '2020-03-11', '01:00:00', 2, 2),
(26, '0', '2020-03-11', '02:00:00', 2, 2),
(27, '0', '2020-03-11', '03:00:00', 2, 2),
(28, '0', '2020-03-11', '04:00:00', 2, 2),
(29, '0', '2020-03-11', '05:00:00', 2, 2),
(30, '7', '2020-03-11', '06:00:00', 2, 2),
(31, '12', '2020-03-11', '07:00:00', 2, 2),
(32, '19', '2020-03-11', '08:00:00', 2, 2),
(33, '25', '2020-03-11', '09:00:00', 2, 2),
(34, '37', '2020-03-11', '10:00:00', 2, 2),
(35, '54', '2020-03-11', '11:00:00', 2, 2),
(36, '72', '2020-03-11', '12:00:00', 2, 2),
(37, '79', '2020-03-11', '13:00:00', 2, 2),
(38, '81', '2020-03-11', '14:00:00', 2, 2),
(39, '82', '2020-03-11', '15:00:00', 2, 2),
(40, '81', '2020-03-11', '16:00:00', 2, 2),
(41, '72', '2020-03-11', '17:00:00', 2, 2),
(42, '67', '2020-03-11', '18:00:00', 2, 2),
(43, '54', '2020-03-11', '19:00:00', 2, 2),
(44, '37', '2020-03-11', '20:00:00', 2, 2),
(45, '14', '2020-03-11', '21:00:00', 2, 2),
(46, '3', '2020-03-11', '22:00:00', 2, 2),
(47, '0', '2020-03-11', '23:00:00', 2, 2),
(48, '0', '2020-03-11', '00:00:00', 2, 2),
(49, '74', '2020-03-11', '01:00:00', 2, 3),
(50, '77', '2020-03-11', '02:00:00', 2, 3),
(51, '85', '2020-03-11', '03:00:00', 2, 3),
(52, '87', '2020-03-11', '04:00:00', 2, 3),
(53, '84', '2020-03-11', '05:00:00', 2, 3),
(54, '77', '2020-03-11', '06:00:00', 2, 3),
(55, '76', '2020-03-11', '07:00:00', 2, 3),
(56, '76', '2020-03-11', '08:00:00', 2, 3),
(57, '74', '2020-03-11', '09:00:00', 2, 3),
(58, '75', '2020-03-11', '10:00:00', 2, 3),
(59, '66', '2020-03-11', '11:00:00', 2, 3),
(60, '67', '2020-03-11', '12:00:00', 2, 3),
(61, '62', '2020-03-11', '13:00:00', 2, 3),
(62, '63', '2020-03-11', '14:00:00', 2, 3),
(63, '58', '2020-03-11', '15:00:00', 2, 3),
(64, '59', '2020-03-11', '16:00:00', 2, 3),
(65, '53', '2020-03-11', '17:00:00', 2, 3),
(66, '55', '2020-03-11', '18:00:00', 2, 3),
(67, '73', '2020-03-11', '19:00:00', 2, 3),
(68, '75', '2020-03-11', '20:00:00', 2, 3),
(69, '74', '2020-03-11', '21:00:00', 2, 3),
(70, '77', '2020-03-11', '22:00:00', 2, 3),
(71, '81', '2020-03-11', '23:00:00', 2, 3),
(72, '80', '2020-03-11', '00:00:00', 2, 3),
(73, '18', '2020-03-11', '01:00:00', 2, 4),
(74, '17', '2020-03-11', '02:00:00', 2, 4),
(75, '17', '2020-03-11', '03:00:00', 2, 4),
(76, '19', '2020-03-11', '04:00:00', 2, 4),
(77, '17', '2020-03-11', '05:00:00', 2, 4),
(78, '18', '2020-03-11', '06:00:00', 2, 4),
(79, '18', '2020-03-11', '07:00:00', 2, 4),
(80, '18', '2020-03-11', '08:00:00', 2, 4),
(81, '17', '2020-03-11', '09:00:00', 2, 4),
(82, '18', '2020-03-11', '10:00:00', 2, 4),
(83, '17', '2020-03-11', '11:00:00', 2, 4),
(84, '18', '2020-03-11', '12:00:00', 2, 4),
(85, '17', '2020-03-11', '13:00:00', 2, 4),
(86, '17', '2020-03-11', '14:00:00', 2, 4),
(87, '18', '2020-03-11', '15:00:00', 2, 4),
(88, '18', '2020-03-11', '16:00:00', 2, 4),
(89, '17', '2020-03-11', '17:00:00', 2, 4),
(90, '18', '2020-03-11', '18:00:00', 2, 4),
(91, '18', '2020-03-11', '19:00:00', 2, 4),
(92, '18', '2020-03-11', '20:00:00', 2, 4),
(93, '18', '2020-03-11', '21:00:00', 2, 4),
(94, '17', '2020-03-11', '22:00:00', 2, 4),
(95, '18', '2020-03-11', '23:00:00', 2, 4),
(96, '18', '2020-03-11', '00:00:00', 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parcela`
--

CREATE TABLE `parcela` (
  `id_parcela` int(11) NOT NULL,
  `color` varchar(20) NOT NULL,
  `id_campo` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `parcela`
--

INSERT INTO `parcela` (`id_parcela`, `color`, `id_campo`, `nombre`) VALUES
(1, '#ff8000', 1, 'Parcela de Patatas'),
(2, '#3b83bd', 1, 'Parcela de Zanahorias');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisos_usuarios`
--

CREATE TABLE `permisos_usuarios` (
  `id_usuario` int(11) NOT NULL,
  `id_parcela` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Trabajador de campo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sonda`
--

CREATE TABLE `sonda` (
  `id_sonda` int(11) NOT NULL,
  `tipoSonda` varchar(30) NOT NULL,
  `estado` varchar(30) DEFAULT NULL,
  `id_parcela` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sonda`
--

INSERT INTO `sonda` (`id_sonda`, `tipoSonda`, `estado`, `id_parcela`) VALUES
(1, 'Temperatura', 'Funcional', 1),
(2, 'Luminosidad', 'Funcional', 1),
(3, 'Humedad', 'Funcional', 1),
(4, 'Salinidad', 'Funcional', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `mail` varchar(60) NOT NULL,
  `password` varchar(30) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `mail`, `password`, `id_cliente`, `id_rol`) VALUES
(1, 'Admin', 'admin@bancal.es', '1234', 1, 1),
(2, 'Jorgex', 'jorge@bancales.es', '1234', 1, 2),
(8, 'Daniel', 'daniel@bancal.es', '1234', 1, 2),
(15, 'Sergi', 'sergi@bancal.es', '123', 1, 2),
(17, 'Alberto', 'alberto@bancal.es', '123', 1, 2),
(18, 'Javi', 'javi@bancal.es', '1234', 1, 2),
(19, 'Admin', 'admin@alcampo.es', '1234', 3, 1),
(20, 'Carlos', 'carlos@alcampo.es', '1234', 3, 2),
(21, 'Admin', 'admin@alcampo.es', '1234', 3, 1),
(22, 'Carlos', 'carlos@alcampo.es', '1234', 3, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `campo`
--
ALTER TABLE `campo`
  ADD PRIMARY KEY (`id_campo`),
  ADD KEY `fk_campo_cliente` (`id_cliente`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `coordenadas`
--
ALTER TABLE `coordenadas`
  ADD PRIMARY KEY (`id_coordenada`),
  ADD KEY `fk_coordenada_parcela` (`id_parcela`);

--
-- Indices de la tabla `medicion`
--
ALTER TABLE `medicion`
  ADD PRIMARY KEY (`id_medicion`),
  ADD KEY `fk_medicion_parcela` (`id_parcela`),
  ADD KEY `fk_medicion_sonda` (`id_sonda`);

--
-- Indices de la tabla `parcela`
--
ALTER TABLE `parcela`
  ADD PRIMARY KEY (`id_parcela`),
  ADD KEY `fk_parcela_campo` (`id_campo`);

--
-- Indices de la tabla `permisos_usuarios`
--
ALTER TABLE `permisos_usuarios`
  ADD KEY `pk_parcela_usuario` (`id_parcela`),
  ADD KEY `pk_usuario_parcela` (`id_usuario`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `sonda`
--
ALTER TABLE `sonda`
  ADD PRIMARY KEY (`id_sonda`),
  ADD KEY `fk_sonda_parcela` (`id_parcela`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usuario_cliente` (`id_cliente`),
  ADD KEY `fk_usuario_roles` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `campo`
--
ALTER TABLE `campo`
  MODIFY `id_campo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `coordenadas`
--
ALTER TABLE `coordenadas`
  MODIFY `id_coordenada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `medicion`
--
ALTER TABLE `medicion`
  MODIFY `id_medicion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `parcela`
--
ALTER TABLE `parcela`
  MODIFY `id_parcela` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sonda`
--
ALTER TABLE `sonda`
  MODIFY `id_sonda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `campo`
--
ALTER TABLE `campo`
  ADD CONSTRAINT `fk_campo_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`);

--
-- Filtros para la tabla `coordenadas`
--
ALTER TABLE `coordenadas`
  ADD CONSTRAINT `fk_coordenada_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcela` (`id_parcela`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medicion`
--
ALTER TABLE `medicion`
  ADD CONSTRAINT `fk_medicion_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcela` (`id_parcela`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_medicion_sonda` FOREIGN KEY (`id_sonda`) REFERENCES `sonda` (`id_sonda`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `parcela`
--
ALTER TABLE `parcela`
  ADD CONSTRAINT `fk_parcela_campo` FOREIGN KEY (`id_campo`) REFERENCES `campo` (`id_campo`);

--
-- Filtros para la tabla `permisos_usuarios`
--
ALTER TABLE `permisos_usuarios`
  ADD CONSTRAINT `pk_parcela_usuario` FOREIGN KEY (`id_parcela`) REFERENCES `parcela` (`id_parcela`),
  ADD CONSTRAINT `pk_usuario_parcela` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `sonda`
--
ALTER TABLE `sonda`
  ADD CONSTRAINT `fk_sonda_parcela` FOREIGN KEY (`id_parcela`) REFERENCES `parcela` (`id_parcela`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  ADD CONSTRAINT `fk_usuario_roles` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
