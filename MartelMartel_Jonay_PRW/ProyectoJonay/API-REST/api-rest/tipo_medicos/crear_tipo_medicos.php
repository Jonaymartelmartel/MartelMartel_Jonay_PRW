<?php
   // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo POST
    if($_SERVER['REQUEST_METHOD'] == 'POST' ){

        // Decodifica el JSON del cuerpo de la solicitud
        $json = json_decode(file_get_contents("php://input"), true);
        
        // Verifica si se han proporcionado los campos necesarios en el JSON
        if(isset($json['tipo_medicos']) && isset ($json['cod_medicos'])){
            // Si se cumplen las condiciones, llama al método para crear un nuevo tipo de médico
            Tipo_medicos::crear_tipo_medicos($json['tipo_medicos'], $json['cod_medicos']);
        }
    }
?>
