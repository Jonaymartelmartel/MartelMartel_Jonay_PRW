<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/director.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo PUT y si se proporcionan los parámetros necesarios en la URL
if($_SERVER['REQUEST_METHOD'] == 'PUT' && isset($_GET['cod_director']) && isset($_GET['id_tipo_personal'])) {
    // Llama al método para actualizar un director con los datos proporcionados en la URL
    Director::actualizar_director($_GET['cod_director'], $_GET['id_tipo_personal']);
}
?>
