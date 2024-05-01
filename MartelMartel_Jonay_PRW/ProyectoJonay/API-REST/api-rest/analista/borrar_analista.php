<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/analista.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo DELETE y si se proporciona el parámetro 'cod_analista'
if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['cod_analista'])) {
    // Llama al método para borrar un analista con el código proporcionado
    Analista::borrar_analista($_GET['cod_analista']);
}
?>
