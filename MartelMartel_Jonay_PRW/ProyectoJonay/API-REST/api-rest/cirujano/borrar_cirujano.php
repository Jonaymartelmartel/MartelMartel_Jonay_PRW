<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/cirujano.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo DELETE y si se proporciona el parámetro 'cod_cirujano' en la URL
if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['cod_cirujano'])) {
    // Llama al método para borrar un cirujano con el código proporcionado en la URL
    Cirujano::borrar_cirujano($_GET['cod_cirujano']);
}
?>
