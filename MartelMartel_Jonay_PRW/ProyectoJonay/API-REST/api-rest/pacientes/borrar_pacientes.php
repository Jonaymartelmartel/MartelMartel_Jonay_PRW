<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/pacientes.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo DELETE y si está presente el parámetro 'cod_pac'
    if($_SERVER['REQUEST_METHOD'] == 'DELETE' 
    && isset($_GET['cod_pac']) ){
        
        // Se llama al método para eliminar pacientes con el 'cod_pac' proporcionado
        Pacientes::borrar_pacientes($_GET['cod_pac']);
    }
?>   
