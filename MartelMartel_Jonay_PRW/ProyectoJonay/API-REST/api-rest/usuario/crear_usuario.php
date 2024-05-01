<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/usuario.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo POST.
    if($_SERVER['REQUEST_METHOD'] == 'POST' ){

        // Se decodifica el contenido JSON del cuerpo de la solicitud y se almacena en la variable $json.
        $json = json_decode(file_get_contents("php://input"), true);
        
        // Se verifica si se proporcionaron los campos `usuario` y `contrasena` en el cuerpo de la solicitud.
        if(isset($json['usuario']) && isset ($json['contrasena'])){
            // Si se proporcionan los campos necesarios, se llama al método `crear_usuario()` de la clase `Usuario` para crear un nuevo usuario en la base de datos.
            Usuario::crear_usuario($json['usuario'], $json['contrasena']);
        }
    }
?>
