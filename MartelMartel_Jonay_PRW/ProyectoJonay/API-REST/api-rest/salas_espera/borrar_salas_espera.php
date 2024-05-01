<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/salas_espera.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo DELETE y si se recibe el parámetro necesario
    if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['cod_salas_espera']) ){
        
        // Se llama al método para borrar las salas de espera
        Salas::borrar_salas($_GET['cod_salas_espera']);
    }
?>
