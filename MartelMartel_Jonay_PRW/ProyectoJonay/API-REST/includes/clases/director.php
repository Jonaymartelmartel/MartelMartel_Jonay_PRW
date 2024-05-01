<?php
class Director {
    // Método para mostrar la información del director
    public static function mostrar_director() {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar y ejecutar consulta SQL para seleccionar la información del director
        $stmt = $connection->prepare("SELECT * FROM director"); 
        if($stmt->execute()) {
            // Obtener resultados y devolver en formato JSON
            $result = $stmt->fetchAll();
            echo json_encode($result);
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la consulta es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la consulta falla
        }
    }

    // Método para crear un nuevo director
    public static function crear_director($id_tipo_personal) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();

        // Preparar consulta SQL de inserción con parámetros
        $stmt = $connection->prepare("INSERT INTO director (id_tipo_personal) 
            VALUES (:id_tipo_personal)");

        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':id_tipo_personal', $id_tipo_personal);

        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la inserción es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la inserción falla
        }
    }

    // Método para borrar un director
    public static function borrar_director($cod_director) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de eliminación con parámetros
        $stmt = $connection->prepare("DELETE FROM director WHERE cod_director = :cod_director"); 
        $stmt->bindParam(':cod_director', $cod_director);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la eliminación es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la eliminación falla
        }
    }

    // Método para actualizar la información de un director
    public static function actualizar_director($cod_director, $id_tipo_personal) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de actualización con parámetros
        $stmt = $connection->prepare('UPDATE director SET id_tipo_personal=:id_tipo_personal WHERE cod_director=:cod_director');
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':cod_director', $cod_director);
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
