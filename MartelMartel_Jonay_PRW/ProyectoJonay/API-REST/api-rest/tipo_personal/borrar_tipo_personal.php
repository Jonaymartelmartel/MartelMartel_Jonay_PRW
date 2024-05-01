<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_personal.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo DELETE y si se proporciona el parámetro `id_tipo_personal`.
    if($_SERVER['REQUEST_METHOD'] == 'DELETE' 
    && isset($_GET['id_tipo_personal']) ){
        // Si se cumplen las condiciones, se llama al método `borrar_tipo_personal()` de la clase `Tipo_personal` para eliminar el tipo de personal de la base de datos.
        Tipo_personal::borrar_tipo_personal($_GET['id_tipo_personal']);
    }
?>
