<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/salas_espera.php');
require_once('../../includes/conexion/bd.php');

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Se obtienen los datos del cuerpo de la solicitud
    $json = json_decode(file_get_contents("php://input"), true);

    // Se verifica si se reciben los parámetros necesarios
    if(isset($json['num_sillas']) && isset($json['cod_hospital'])){
        // Se llama al método para crear nuevas salas de espera
        Salas::crear_salas($json['num_sillas'], $json['cod_hospital']);
    }
}
?>
