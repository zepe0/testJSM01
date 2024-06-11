<?php
include_once ("../conexion.php");
include_once ("../id.php");


$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);


/* $token = $data['token'];  */
$token = "6657a75ab31027bde47f171d";

/* $titulo = $data['titulo']; */
$titulo = "FOO";


$id = generateObjectId();

$data = [];


$sql = 'INSERT INTO encuesta (id,tituloEncuesta,idUser) VALUES ( ?,?,? )';
try {
    $resultado = $conexion->prepare($sql);
    $resultado->bind_param('sss', $id, $titulo, $token);
    $resultado->execute();
} catch (mysqli_sql_exception $e) {

    $data['success'] = false;
    $data['msn'] = "Error en la base de datos: " . $e->getMessage();

}
if (!isset($data['success'])) {

    /*    $opciones = $data['opcion']; */
    $opciones = ["Opción 1", "Opción 2"];


    $data = [];
    foreach ($opciones as $texo => $opcion) {
        $idOpcion = generateObjectId();



        $sql = 'INSERT INTO opciones (id,opcion,idEncuesta) VALUES ( ?,?,? )';
        try {
            $resultado = $conexion->prepare($sql);
            $resultado->bind_param('sss', $idOpcion, $opcion, $id);
            $resultado->execute();
        } catch (mysqli_sql_exception $e) {

            $data['success'] = false;
            $data['msn'] = "Error en la base de datos: " . $e->getMessage();

        }
        if (!isset($data['success'])) {
            $data['success'] = true;
            $data['msn'] = "Encuesta añadida";
        }
    }

    /* $data['success'] = true;
    $data['msn'] = "Encuesta añadida";
    $data['encuesta'] = $id; */

}

echo json_encode($data);
$conexion->close();