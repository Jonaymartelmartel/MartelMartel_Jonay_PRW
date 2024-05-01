<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/salas_espera.php');
require_once('../../includes/conexion/bd.php');

if($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Se llama al método para mostrar todas las salas de espera
    Salas::mostrar_salas_espera();
}
?>
