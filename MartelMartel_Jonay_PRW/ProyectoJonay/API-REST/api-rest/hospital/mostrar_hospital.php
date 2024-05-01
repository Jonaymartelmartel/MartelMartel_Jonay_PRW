<?php
// Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/hospital.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo GET
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        // Llama al método para mostrar información sobre los hospitales
        Hospital::mostrar_hospital();
    }
?>
