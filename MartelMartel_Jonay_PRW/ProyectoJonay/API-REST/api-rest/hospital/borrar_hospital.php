<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/hospital.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo DELETE y si se proporciona el parámetro 'cod_hospital'
if($_SERVER['REQUEST_METHOD'] == 'DELETE' && isset($_GET['cod_hospital']) ){
    // Llama al método para borrar el hospital con el código proporcionado
    Hospital::borrar_hospital($_GET['cod_hospital']);
}
?>
