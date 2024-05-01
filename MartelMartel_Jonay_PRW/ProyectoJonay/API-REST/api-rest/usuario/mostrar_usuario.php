<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/usuario.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo GET.
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        // Si es una solicitud GET, se llama al método `mostrar_usuario()` de la clase `Usuario` para mostrar todos los usuarios almacenados en la base de datos.
        Usuario::mostrar_usuario();
    }
?>
