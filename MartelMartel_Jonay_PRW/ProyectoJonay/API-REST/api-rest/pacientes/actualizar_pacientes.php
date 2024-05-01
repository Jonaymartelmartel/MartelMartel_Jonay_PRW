<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/pacientes.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo PUT y si están presentes todos los parámetros necesarios
    if($_SERVER['REQUEST_METHOD'] == 'PUT' 
    && isset($_GET['cod_pac']) && isset($_GET['dni_pac']) && isset ($_GET['nombre']) && isset($_GET['apellidos']) && isset($_GET['edad']) && isset($_GET['telefono']) && isset($_GET['cod_hospital']) && isset($_GET['cod_salas_espera']) ){
        
        // Se llama al método para actualizar pacientes con los parámetros proporcionados
        Pacientes::actualizar_pacientes($_GET['cod_pac'], $_GET['dni_pac'], $_GET['nombre'], $_GET['apellidos'], $_GET['edad'], $_GET['telefono'], $_GET['cod_hospital'], $_GET['cod_salas_espera']);
    }
?>   
