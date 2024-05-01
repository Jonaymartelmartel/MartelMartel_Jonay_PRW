<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/personal.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo DELETE y si se recibe el parámetro 'cod_per'
    if($_SERVER['REQUEST_METHOD'] == 'DELETE' 
    && isset($_GET['cod_per']) ){
        
        // Se llama al método para eliminar el personal médico con el código recibido
        Personal::borrar_personal($_GET['cod_per']);
    }

?>   
