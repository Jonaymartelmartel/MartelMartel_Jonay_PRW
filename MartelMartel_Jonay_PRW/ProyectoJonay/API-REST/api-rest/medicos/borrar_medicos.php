<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/medicos.php');
    require_once('../../includes/conexion/bd.php');

    // Verifica si la solicitud es de tipo DELETE y si se proporciona el parámetro 'cod_medicos'
    if($_SERVER['REQUEST_METHOD'] == 'DELETE' 
    && isset($_GET['cod_medicos']) ){
        
        // Llama al método para borrar la información de un médico
        Medicos::borrar_medicos($_GET['cod_medicos']);
    }
?>
