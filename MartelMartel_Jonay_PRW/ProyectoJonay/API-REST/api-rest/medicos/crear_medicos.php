<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo POST
    if($_SERVER['REQUEST_METHOD'] == 'POST' ){

        // Decodifica los datos JSON recibidos en la solicitud
        $json = json_decode(file_get_contents("php://input"), true);
        
        // Verifica si se proporcionan los campos necesarios en el JSON
        if(isset($json['nombre']) && isset($json['especialidad']) && isset ($json['id_tipo_personal'])){
            
            // Llama al método para crear un nuevo registro de médico en la base de datos
            Medicos::crear_medicos($json['nombre'], $json['especialidad'], $json['id_tipo_personal']);
        }
    }
?> 
