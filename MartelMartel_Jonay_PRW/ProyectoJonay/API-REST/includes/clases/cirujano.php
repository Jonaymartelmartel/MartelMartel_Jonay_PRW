<?php
class Cirujano {
    // Método para mostrar la información de los cirujanos
    public static function mostrar_cirujano() {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar y ejecutar consulta SQL para seleccionar la información de los cirujanos
        $stmt = $connection->prepare("SELECT * FROM cirujano"); 
        if($stmt->execute()) {
            // Obtener resultados y devolver en formato JSON
            $result = $stmt->fetchAll();
            echo json_encode($result);
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la consulta es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la consulta falla
        }
    }

    // Método para crear un nuevo cirujano
    public static function crear_cirujano($num_colegiado, $id_tipo_medicos) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();

        // Preparar consulta SQL de inserción con parámetros
        $stmt = $connection->prepare("INSERT INTO cirujano (num_colegiado, id_tipo_medicos) 
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

    // Método para borrar un cirujano
    public static function borrar_cirujano($cod_cirujano) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de eliminación con parámetros
        $stmt = $connection->prepare("DELETE FROM cirujano WHERE cod_cirujano = :cod_cirujano"); 
        $stmt->bindParam(':cod_cirujano', $cod_cirujano);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la eliminación es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la eliminación falla
        }
    }

    // Método para actualizar la información de un cirujano
    public static function actualizar_cirujano($cod_cirujano, $num_colegiado, $id_tipo_medicos) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de actualización con parámetros
        $stmt = $connection->prepare('UPDATE cirujano SET num_colegiado=:num_colegiado, id_tipo_medicos=:id_tipo_medicos WHERE cod_cirujano=:cod_cirujano');
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':cod_cirujano', $cod_cirujano);
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
