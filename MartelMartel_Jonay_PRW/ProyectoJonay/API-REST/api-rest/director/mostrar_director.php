<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/director.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo GET
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Llama al método para mostrar la información del director
    Director::mostrar_director();
}
?>
