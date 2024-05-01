<?php
// Incluye los archivos de la clase y conexion
require_once('../../includes/clases/hospital.php');
require_once('../../includes/conexion/bd.php');

// Verifica si la solicitud es de tipo PUT y si se proporcionan todos los parámetros necesarios
if($_SERVER['REQUEST_METHOD'] == 'PUT' && isset($_GET['cod_hospital']) && isset($_GET['cif_hospital']) && isset ($_GET['nombre']) && isset($_GET['direccion']) && isset($_GET['localidad']) && isset($_GET['telefono']) ){
    // Llama al método para actualizar el hospital con los datos proporcionados
    Hospital::actualizar_hospital($_GET['cod_hospital'], $_GET['cif_hospital'], $_GET['nombre'], $_GET['direccion'], $_GET['localidad'], $_GET['telefono']);
}
?>
