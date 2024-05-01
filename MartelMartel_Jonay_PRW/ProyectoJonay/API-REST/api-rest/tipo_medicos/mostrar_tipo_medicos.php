<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo GET
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        // Si es una solicitud GET, llama al método para mostrar todos los tipos de médicos
        Tipo_medicos::mostrar_tipo_medicos();
    }
?>
