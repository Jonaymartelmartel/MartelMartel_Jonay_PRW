<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/expediente.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo POST
if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Decodifica el JSON enviado en el cuerpo de la solicitud
    $json = json_decode(file_get_contents("php://input"), true);

    // Verifica si se proporcionan todos los campos necesarios en el JSON decodificado
    if(isset($json['vacunas']) && isset ($json['historial_medico']) && isset($json['enfermedades']) && isset($json['cod_pac'])){
        // Llama al método para crear un expediente con los datos proporcionados en el JSON
        Expediente::crear_expediente($json['vacunas'], $json['historial_medico'], $json['enfermedades'], $json['cod_pac']);
    }
}
?>
