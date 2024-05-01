<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/personal.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo PUT y si se reciben todos los parámetros necesarios
    if($_SERVER['REQUEST_METHOD'] == 'PUT' 
    && isset($_GET['cod_per']) && isset($_GET['dni_per']) && isset ($_GET['nombre']) && isset($_GET['apellidos']) && isset($_GET['salario']) && isset($_GET['contrato']) && isset($_GET['cod_hospital'])){
        
        // Se llama al método para actualizar el personal médico con los parámetros recibidos
        Personal::actualizar_personal($_GET['cod_per'], $_GET['dni_per'], $_GET['nombre'], $_GET['apellidos'], $_GET['salario'], $_GET['contrato'], $_GET['cod_hospital']);
    }

?>   
