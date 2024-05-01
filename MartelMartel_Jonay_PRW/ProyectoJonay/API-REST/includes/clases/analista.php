<?php
class Analista {
    // Método para mostrar la información de los analistas
    public static function mostrar_analista() {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar y ejecutar consulta SQL para seleccionar la información de los analistas
        $stmt = $connection->prepare("SELECT * FROM analista"); 
        if($stmt->execute()) {
            // Obtener resultados y devolver en formato JSON
            $result = $stmt->fetchAll();
            echo json_encode($result);
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la consulta es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la consulta falla
        }
    }

    // Método para crear un nuevo analista
    public static function crear_analista($num_colegiado, $id_tipo_medicos) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();

        // Preparar consulta SQL de inserción con parámetros
        $stmt = $connection->prepare("INSERT INTO analista (num_colegiado, id_tipo_medicos) 
            VALUES (:num_colegiado, :id_tipo_medicos)");

        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':num_colegiado', $num_colegiado);
        $stmt->bindParam(':id_tipo_medicos', $id_tipo_medicos);

        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la inserción es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la inserción falla
        }
    }

    // Método para borrar un analista
    public static function borrar_analista($cod_analista) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de eliminación con parámetros
        $stmt = $connection->prepare("DELETE FROM analista WHERE cod_analista = :cod_analista"); 
        $stmt->bindParam(':cod_analista', $cod_analista);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la eliminación es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la eliminación falla
        }
    }

    // Método para actualizar la información de un analista
    public static function actualizar_analista($cod_analista, $num_colegiado, $id_tipo_medicos) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de actualización con parámetros
        $stmt = $connection->prepare('UPDATE analista SET num_colegiado=:num_colegiado, id_tipo_medicos=:id_tipo_medicos WHERE cod_analista=:cod_analista');
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':cod_analista', $cod_analista);
        $stmt->bindParam(':num_colegiado', $num_colegiado);
        $stmt->bindParam(':id_tipo_medicos', $id_tipo_medicos);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la actualización es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la actualización falla
        }
    }
}
?>
