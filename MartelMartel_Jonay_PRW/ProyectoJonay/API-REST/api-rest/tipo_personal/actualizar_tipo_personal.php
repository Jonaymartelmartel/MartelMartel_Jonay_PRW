<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_personal.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo PUT y si se proporcionan los parámetros necesarios
    if($_SERVER['REQUEST_METHOD'] == 'PUT' 
    && isset($_GET['id_tipo_personal']) && isset($_GET['tipo_personal']) && isset ($_GET['cod_per'])){
        // Si se cumplen las condiciones, se llama al método para actualizar el tipo de personal
        Tipo_personal::actualizar_tipo_personal($_GET['id_tipo_personal'], $_GET['tipo_personal'], $_GET['cod_per']);
    }
?>
