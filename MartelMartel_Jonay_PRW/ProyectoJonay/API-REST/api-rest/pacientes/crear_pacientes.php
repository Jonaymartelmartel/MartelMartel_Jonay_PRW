<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/pacientes.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo POST
    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
        // Se decodifica el JSON recibido en la solicitud POST
        $json = json_decode(file_get_contents("php://input"), true);

        // Se verifica si están presentes todos los campos necesarios en el JSON decodificado
        if(isset($json['dni_pac']) && isset ($json['nombre']) && isset($json['apellidos']) && isset($json['edad']) && isset($json['telefono']) && isset($json['cod_hospital']) && isset($json['cod_salas_espera'])){
            
            // Se llama al método para crear nuevos pacientes con los datos proporcionados
            Pacientes::crear_pacientes($json['dni_pac'], $json['nombre'], $json['apellidos'], $json['edad'], $json['telefono'], $json['cod_hospital'], $json['cod_salas_espera']);
        }
    }
?>    
