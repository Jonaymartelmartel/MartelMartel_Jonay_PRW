<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/cirujano.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo POST
if($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Obtiene y decodifica el JSON enviado en la solicitud
    $json = json_decode(file_get_contents("php://input"), true);
    
    // Verifica si se han recibido los datos necesarios en el JSON
    if(isset($json['num_colegiado']) && isset($json['id_tipo_medicos'])){
        // Llama al método para crear un nuevo cirujano con los datos proporcionados
        Cirujano::crear_cirujano($json['num_colegiado'], $json['id_tipo_medicos']);
    }
}
?>
