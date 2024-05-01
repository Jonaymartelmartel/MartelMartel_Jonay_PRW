<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/analista.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo PUT
if($_SERVER['REQUEST_METHOD'] == 'PUT'){

    // Obtiene y decodifica el JSON enviado en la solicitud
    $json = json_decode(file_get_contents("php://input"), true);

    // Verifica si se han recibido los datos necesarios en el JSON
    if(isset($json['cod_analista']) && isset($json['num_colegiado']) && isset($json['id_tipo_medicos'])){
        // Llama al método para actualizar el analista con los datos proporcionados
        Analista::actualizar_analista($json['cod_analista'], $json['num_colegiado'], $json['id_tipo_medicos']);
    }
}
?>
