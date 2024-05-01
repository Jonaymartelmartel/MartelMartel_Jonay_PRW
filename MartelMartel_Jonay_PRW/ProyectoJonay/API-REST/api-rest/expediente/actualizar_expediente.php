<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/expediente.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo PUT y si se proporcionan todos los parámetros necesarios en la URL
if($_SERVER['REQUEST_METHOD'] == 'PUT' && isset($_GET['cod_expediente']) && isset($_GET['vacunas']) && isset($_GET['historial_medico']) && isset($_GET['enfermedades']) && isset($_GET['cod_pac'])) {
    // Llama al método para actualizar un expediente con los datos proporcionados en la URL
    Expediente::actualizar_expediente($_GET['cod_expediente'], $_GET['vacunas'], $_GET['historial_medico'], $_GET['enfermedades'], $_GET['cod_pac']);
}
?>
