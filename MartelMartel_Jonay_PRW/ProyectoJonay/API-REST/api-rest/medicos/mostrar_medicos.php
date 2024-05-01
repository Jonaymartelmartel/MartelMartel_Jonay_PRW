<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo GET
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        
        // Llama al método para mostrar todos los registros de médicos en la base de datos
        Medicos::mostrar_medicos();
    }
?> 
