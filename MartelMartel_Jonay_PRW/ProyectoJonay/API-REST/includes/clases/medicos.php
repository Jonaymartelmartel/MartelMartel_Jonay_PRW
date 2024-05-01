<?php
class Medicos {
    // Método para mostrar todos los médicos
    public static function mostrar_medicos() {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar y ejecutar consulta SQL para seleccionar todos los médicos
        $stmt = $connection->prepare("SELECT * FROM medicos"); 
        if($stmt->execute()) {
            // Obtener resultados y devolver en formato JSON
            $result = $stmt->fetchAll();
            echo json_encode($result);
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la consulta es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la consulta falla
        }
    }

    // Método para crear un nuevo médico
    public static function crear_medicos($nombre, $especialidad, $id_tipo_personal) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();

        // Preparar consulta SQL de inserción con parámetros
        $stmt = $connection->prepare("INSERT INTO medicos (nombre, especialidad, id_tipo_personal) 
            VALUES (:nombre, :especialidad, :id_tipo_personal)");

        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':especialidad', $especialidad);
        $stmt->bindParam(':id_tipo_personal', $id_tipo_personal);

        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la inserción es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la inserción falla
        }
    }

    // Método para borrar un médico
    public static function borrar_medicos($cod_medicos) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de eliminación con parámetros
        $stmt = $connection->prepare("DELETE FROM medicos WHERE cod_medicos = :cod_medicos"); 
        $stmt->bindParam(':cod_medicos', $cod_medicos);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la eliminación es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la eliminación falla
        }
    }

    // Método para actualizar la información de un médico
    public static function actualizar_medicos($cod_medicos, $nombre, $especialidad, $id_tipo_personal) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de actualización con parámetros
        $stmt = $connection->prepare('UPDATE medicos SET nombre=:nombre, especialidad=:especialidad, id_tipo_personal=:id_tipo_personal WHERE cod_medicos=:cod_medicos');
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':cod_medicos', $cod_medicos);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':especialidad', $especialidad);
        $stmt->bindParam(':id_tipo_personal', $id_tipo_personal);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la actualización es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la actualización falla
        }
    }
}
?>
