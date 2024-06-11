-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-06-2024 a las 13:42:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `encuesta`
--

CREATE TABLE `encuesta` (
  `id` varchar(100) NOT NULL,
  `tituloEncuesta` varchar(100) NOT NULL,
  `idUser` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `encuesta`
--

INSERT INTO `encuesta` (`id`, `tituloEncuesta`, `idUser`) VALUES
('1', 'cafe', '6657a7a3e4c708fbd8a38922'),
('45', 'Movils', '6657a7c95a91b0cfb1e7c2b8'),
('5', 'Tomates', '6657a75ab31027bde47f171d'),
('666832a7466b9a16c9cd5eb0', 'FOO', '6657a75ab31027bde47f171d');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opciones`
--

CREATE TABLE `opciones` (
  `id` varchar(100) NOT NULL,
  `opcion` varchar(100) NOT NULL,
  `idEncuesta` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `opciones`
--

INSERT INTO `opciones` (`id`, `opcion`, `idEncuesta`) VALUES
('', 'opo', '45'),
('1', 'Appel', '45'),
('3', 'Appel', '45'),
('666832a79adf91597ae7e2c6', 'Opción 1', '666832a7466b9a16c9cd5eb0'),
('666832a7f800106ea55e8ce7', 'Opción 2', '666832a7466b9a16c9cd5eb0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultado`
--

CREATE TABLE `resultado` (
  `id` varchar(255) NOT NULL,
  `idOpcion` varchar(255) NOT NULL,
  `idEncuesta` varchar(255) NOT NULL,
  `idUser` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `resultado`
--

INSERT INTO `resultado` (`id`, `idOpcion`, `idEncuesta`, `idUser`) VALUES
('1', '1', '45', ''),
('2', '1', '45', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pws` varchar(300) NOT NULL,
  `Tel` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `alta` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `pws`, `Tel`, `avatar`, `alta`) VALUES
('6657a75ab31027bde47f171d', 'zepe@zepe.es', '1', '689800067', 'http://localhost/sql/app/img/chicodefaul2.png', '2024-05-30'),
('6657a7670e3d5ba65b242a80', 'lile.nona@gmail.com', '1', '600089877', 'http://localhost/sql/app/img/chicadefaul3.png', '2024-05-30'),
('6657a772b4b012cd83d45101', 'juan.perez@example.com', '2', '650123456', 'http://localhost/sql/app/img/chicodefaul1.png', '2024-05-31'),
('6657a781f8d907efb3a26541', 'maria.gomez@example.com', '3', '690234567', 'http://localhost/sql/app/img/chicadefaul2.png', '2024-05-31'),
('6657a7916b4f02d7a9a271a3', 'pedro.lopez@example.com', '4', '670345678', 'http://localhost/sql/app/img/chicodefaul3.png', '2024-06-01'),
('6657a7a3e4c708fbd8a38922', 'ana.martin@example.com', '5', '680456789', 'http://localhost/sql/app/img/chicadefaul1.png', '2024-06-01'),
('6657a7b64b7b0aeba4c5b4a5', 'luis.garcia@example.com', '6', '620567890', 'http://localhost/sql/app/img/chicodefaul2.png', '2024-06-02'),
('6657a7c95a91b0cfb1e7c2b8', 'carmen.lopez@example.com', '7', '660678901', 'http://localhost/sql/app/img/chicadefaul3.png', '2024-06-02'),
('6657a7dbd2c217d1c0f2d2d3', 'jose.ramirez@example.com', '8', '640789012', 'http://localhost/sql/app/img/chicodefaul1.png', '2024-06-03');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `idUser` (`idUser`) USING BTREE;

--
-- Indices de la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEncuesta` (`idEncuesta`),
  ADD KEY `id` (`id`) USING BTREE;

--
-- Indices de la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idEncuesta` (`idEncuesta`),
  ADD KEY `idOpcion` (`idOpcion`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id` (`id`) USING BTREE;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `encuesta`
--
ALTER TABLE `encuesta`
  ADD CONSTRAINT `encuesta_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `opciones`
--
ALTER TABLE `opciones`
  ADD CONSTRAINT `opciones_ibfk_1` FOREIGN KEY (`idEncuesta`) REFERENCES `encuesta` (`id`);

--
-- Filtros para la tabla `resultado`
--
ALTER TABLE `resultado`
  ADD CONSTRAINT `resultado_ibfk_1` FOREIGN KEY (`idOpcion`) REFERENCES `opciones` (`id`),
  ADD CONSTRAINT `resultado_ibfk_2` FOREIGN KEY (`idEncuesta`) REFERENCES `encuesta` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
