<?php
$server = "localhost";
$user = "root";
$pass = "";
$db = "test";
$conexion = new mysqli($server, $user, $pass, $db);
if ($conexion->connect_error) {
    die("Error Conexión Fallida" . $conexion->connect_error);
}

?>