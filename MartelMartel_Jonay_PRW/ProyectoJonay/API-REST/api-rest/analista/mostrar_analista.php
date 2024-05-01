<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/analista.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo GET
if($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Llama al método para mostrar todos los analistas
    Analista::mostrar_analista();
}
?>
