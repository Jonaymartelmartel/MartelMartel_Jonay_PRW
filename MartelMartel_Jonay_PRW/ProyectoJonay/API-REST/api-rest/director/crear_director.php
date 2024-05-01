<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/director.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo POST
if($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Obtiene y decodifica el JSON enviado en la solicitud
    $json = json_decode(file_get_contents("php://input"), true);
    
    // Verifica si se ha recibido el dato necesario en el JSON
    if(isset($json['id_tipo_personal'])) {
        // Llama al método para crear un nuevo director con el dato proporcionado
        Director::crear_director($json['id_tipo_personal']);
    }
}
?>
