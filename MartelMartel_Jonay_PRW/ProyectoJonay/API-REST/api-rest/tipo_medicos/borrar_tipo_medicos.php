<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo DELETE
    if($_SERVER['REQUEST_METHOD'] == 'DELETE' 
    && isset($_GET['id_tipo_medicos']) ){
        // Si se cumple la condición, llama al método para eliminar el tipo de médico
        Tipo_medicos::borrar_tipo_medicos($_GET['id_tipo_medicos']);
    }
?>
