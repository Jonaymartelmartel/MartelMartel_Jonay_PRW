<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_personal.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo POST.
    if($_SERVER['REQUEST_METHOD'] == 'POST' ){
        // Se decodifica el contenido JSON del cuerpo de la solicitud y se almacena en la variable $json.
        $json = json_decode(file_get_contents("php://input"), true);
        
        // Se verifica si se proporcionan los parámetros 'tipo_personal' y 'cod_per' en el JSON decodificado.
        if(isset($json['tipo_personal']) && isset ($json['cod_per'])){
            // Si se cumplen las condiciones, se llama al método `crear_tipo_personal()` de la clase `Tipo_personal` para crear un nuevo tipo de personal en la base de datos.
            Tipo_personal::crear_tipo_personal($json['tipo_personal'], $json['cod_per']);
        }
    }
?>
