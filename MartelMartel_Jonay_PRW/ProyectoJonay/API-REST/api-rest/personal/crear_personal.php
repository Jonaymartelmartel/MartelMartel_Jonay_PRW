<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/personal.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo POST
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        // Se obtienen los datos del cuerpo de la solicitud en formato JSON y se decodifican
        $json = json_decode(file_get_contents("php://input"), true);

        // Se verifica si se reciben todos los campos necesarios en el formato JSON
        if(isset($json['dni_per']) && isset($json['nombre']) && isset($json['apellidos']) && isset($json['salario']) && isset($json['contrato']) && isset($json['cod_hospital'])){
            
            // Se llama al método para crear una nueva entrada de personal médico en la base de datos
            Personal::crear_personal($json['dni_per'], $json['nombre'], $json['apellidos'], $json['salario'], $json['contrato'], $json['cod_hospital']);
        }
    }
?>
