<?php
class Expediente {
    // Método para mostrar todos los expedientes
    public static function mostrar_expediente() {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar y ejecutar consulta SQL para seleccionar todos los expedientes
        $stmt = $connection->prepare("SELECT * FROM expediente"); 
        if($stmt->execute()) {
            // Obtener resultados y devolver en formato JSON
            $result = $stmt->fetchAll();
            echo json_encode($result);
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la consulta es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la consulta falla
        }
    }

    // Método para crear un nuevo expediente
    public static function crear_expediente($vacunas, $historial_medico, $enfermedades, $cod_pac) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();

        // Preparar consulta SQL de inserción con parámetros
        $stmt = $connection->prepare("INSERT INTO expediente (vacunas, historial_medico, enfermedades, cod_pac) 
            VALUES (:vacunas, :historial_medico, :enfermedades, :cod_pac)");

        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':vacunas', $vacunas);
        $stmt->bindParam(':historial_medico', $historial_medico);
        $stmt->bindParam(':enfermedades', $enfermedades);
        $stmt->bindParam(':cod_pac', $cod_pac);

        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la inserción es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la inserción falla
        }
    }

    // Método para borrar un expediente
    public static function borrar_expediente($cod_expediente) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de eliminación con parámetros
        $stmt = $connection->prepare("DELETE FROM expediente WHERE cod_expediente = :cod_expediente"); 
        $stmt->bindParam(':cod_expediente', $cod_expediente);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la eliminación es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la eliminación falla
        }
    }

    // Método para actualizar la información de un expediente
    public static function actualizar_expediente($cod_expediente, $vacunas, $historial_medico, $enfermedades, $cod_pac) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de actualización con parámetros
        $stmt = $connection->prepare('UPDATE expediente SET vacunas=:vacunas, historial_medico=:historial_medico, enfermedades=:enfermedades, cod_pac=:cod_pac WHERE cod_expediente=:cod_expediente');
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':vacunas', $vacunas);
        $stmt->bindParam(':historial_medico', $historial_medico);
        $stmt->bindParam(':enfermedades', $enfermedades);
        $stmt->bindParam(':cod_pac', $cod_pac);
        $stmt->bindParam(':cod_expediente', $cod_expediente);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la actualización es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la actualización falla
        }
    }
}
?>
