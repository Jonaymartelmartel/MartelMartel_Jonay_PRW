<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo PUT y si se proporcionan los parámetros necesarios
    if($_SERVER['REQUEST_METHOD'] == 'PUT' 
    && isset($_GET['cod_medicos']) && isset($_GET['nombre']) && isset($_GET['especialidad']) && isset ($_GET['id_tipo_personal'])){
        
        // Llama al método para actualizar la información de un médico
        Medicos::actualizar_medicos($_GET['cod_medicos'], $_GET['nombre'], $_GET['especialidad'], $_GET['id_tipo_personal']);
    }
?>
