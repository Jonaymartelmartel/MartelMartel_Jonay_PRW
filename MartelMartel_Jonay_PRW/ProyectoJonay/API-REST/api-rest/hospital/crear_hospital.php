<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/hospital.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo POST
if($_SERVER['REQUEST_METHOD'] == 'POST' ){
    // Decodifica el JSON recibido en la solicitud
    $json = json_decode(file_get_contents("php://input"), true);
    
    // Verifica si se recibieron todos los parámetros necesarios para crear un hospital
    if(isset($json['cif_hospital']) && isset ($json['nombre']) && isset($json['direccion']) && isset($json['localidad']) && isset($json['telefono']) ){
        // Llama al método para crear un nuevo hospital con los datos proporcionados
        Hospital::crear_hospital($json['cif_hospital'], $json['nombre'], $json['direccion'], $json['localidad'], $json['telefono']);
    }
}
?>
