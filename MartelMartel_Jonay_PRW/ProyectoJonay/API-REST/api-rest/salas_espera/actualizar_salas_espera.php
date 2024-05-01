<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/salas_espera.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo PUT y si se reciben los parámetros necesarios
    if($_SERVER['REQUEST_METHOD'] == 'PUT' && isset($_GET['cod_salas_espera']) && isset ($_GET['num_sillas']) && isset($_GET['cod_hospital'])){
        
        // Se llama al método para actualizar las salas de espera
        Salas::actualizar_salas($_GET['cod_salas_espera'], $_GET['num_sillas'], $_GET['cod_hospital']);
    }
?>
