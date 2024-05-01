<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/expediente.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo DELETE y si se proporciona el parámetro 'cod_expediente' en la URL
if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['cod_expediente'])) {
    // Llama al método para borrar un expediente con el 'cod_expediente' proporcionado en la URL
    Expediente::borrar_expediente($_GET['cod_expediente']);
}
?>
