<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/director.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo DELETE y si se proporciona el parámetro 'cod_director' en la URL
if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['cod_director'])) {
    // Llama al método para borrar un director con el código proporcionado en la URL
    Director::borrar_director($_GET['cod_director']);
}
?>
