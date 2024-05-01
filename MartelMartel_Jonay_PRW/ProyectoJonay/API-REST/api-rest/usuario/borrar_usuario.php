<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/usuario.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo DELETE.
    if($_SERVER['REQUEST_METHOD'] == 'DELETE' 
    && isset($_GET['id_usuario']) ){
        // Si la solicitud es DELETE y se proporciona el parámetro `id_usuario`, se llama al método `borrar_usuario()` de la clase `Usuario` para eliminar el usuario correspondiente de la base de datos.
        Usuario::borrar_usuario($_GET['id_usuario']);
    }
?>
