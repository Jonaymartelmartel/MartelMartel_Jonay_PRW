<?php
    // Incluye los archivos de la clase y conexion
    require_once('../../includes/clases/tipo_personal.php');
    require_once('../../includes/conexion/bd.php');

    // Se verifica si la solicitud es de tipo GET.
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        // Si es una solicitud GET, se llama al método `mostrar_tipo_personal()` de la clase `Tipo_personal` para obtener y mostrar todos los tipos de personal almacenados en la base de datos.
        Tipo_personal::mostrar_tipo_personal();
    }
?>
