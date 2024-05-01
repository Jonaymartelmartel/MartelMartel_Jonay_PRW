<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/cirujano.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo PUT y si se proporcionan los parámetros necesarios en la URL
if($_SERVER['REQUEST_METHOD'] == 'PUT' && isset($_GET['cod_cirujano']) && isset($_GET['num_colegiado']) && isset($_GET['id_tipo_medicos'])) {
    // Llama al método para actualizar un cirujano con los datos proporcionados en la URL
    Cirujano::actualizar_cirujano($_GET['cod_cirujano'], $_GET['num_colegiado'], $_GET['id_tipo_medicos']);
}
?>
