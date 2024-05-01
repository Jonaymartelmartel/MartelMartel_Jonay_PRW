<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/usuario.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo PUT.
    if($_SERVER['REQUEST_METHOD'] == 'PUT' 
    && isset($_GET['id_usuario']) && isset($_GET['usuario']) && isset ($_GET['contrasena'])){
        // Si es una solicitud PUT y se proporcionan los parámetros necesarios (`id_usuario`, `usuario` y `contrasena`), se llama al método `actualizar_usuario()` de la clase `Usuario` para actualizar la información del usuario en la base de datos.
        Usuario::actualizar_usuario($_GET['id_usuario'], $_GET['usuario'], $_GET['contrasena']);
    }
?>
