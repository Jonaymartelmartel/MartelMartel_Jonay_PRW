<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo PUT
    if($_SERVER['REQUEST_METHOD'] == 'PUT' 
    && isset($_GET['id_tipo_medicos']) && isset($_GET['tipo_medicos']) && isset ($_GET['cod_medicos'])){
        // Si se cumplen las condiciones, llama al método para actualizar el tipo de médico
        Tipo_medicos::actualizar_tipo_medicos($_GET['id_tipo_medicos'], $_GET['tipo_medicos'], $_GET['cod_medicos']);
    }
?>
