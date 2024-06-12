<?php
include_once ("../conexion.php");
include_once ("../id.php");


$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);


/* $token = $data['token'];  */
$token = "6657a75ab31027bde47f171d";

/* $titulo = $data['titulo']; */
$titulo = "FOO";



$data = [];
/* SELECT u.id as idUser, u.email, e.tituloEncuesta, o.opcion FROM user u, encuesta e LEFT JOIN opciones o ON o.idEncuesta=e.id WHERE e.idUser=u.id AND e.id=45; */
/* SELECT * FROM `resultado` WHERE idEncuesta=45 AND idOpcion=3; */

$sql = 'SELECT u.id as idUser, u.email, e.tituloEncuesta, o.opcion, e.id FROM user u, encuesta e LEFT JOIN opciones o ON o.idEncuesta=e.id WHERE e.idUser=u.id;';
try {

    $query = $conexion->prepare($sql);

    $query->execute();

    $data = [];

    $result = $query->get_result();
    if ($result->num_rows > 0) {

        while ($fila = $result->fetch_assoc()) {

            $data["encuesta"][] = $fila;
        }
    } else {

        $data = ["msn" => "Sin amigos"];
    }
} catch (\Throwable $e) { 
    $data['success'] = false;
    $data['msn'] = "Error en la base de datos: " . $e->getMessage();
}

echo json_encode($data);
$conexion->close();