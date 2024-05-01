<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/pacientes.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo GET
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        
        // Se llama al método para mostrar todos los pacientes
        Pacientes::mostrar_pacientes();
    }
?>  
