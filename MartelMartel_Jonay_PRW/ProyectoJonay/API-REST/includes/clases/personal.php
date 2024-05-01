<?php
class Personal {
    // Método para mostrar todo el personal
    public static function mostrar_personal() {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar y ejecutar consulta SQL para seleccionar todo el personal
        $stmt = $connection->prepare("SELECT * FROM personal"); 
        if($stmt->execute()) {
            // Obtener resultados y devolver en formato JSON
            $result = $stmt->fetchAll();
            echo json_encode($result);
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la consulta es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la consulta falla
        }
    }

    // Método para crear nuevo personal
    public static function crear_personal($dni_per, $nombre, $apellidos, $salario, $contrato, $cod_hospital) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();

        // Preparar consulta SQL de inserción con parámetros
        $stmt = $connection->prepare("INSERT INTO personal (dni_per, nombre, apellidos, salario, contrato, cod_hospital) 
            VALUES (:dni_per, :nombre, :apellidos, :salario, :contrato, :cod_hospital)");

        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':dni_per', $dni_per);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':salario', $salario);
        $stmt->bindParam(':contrato', $contrato);
        $stmt->bindParam(':cod_hospital', $cod_hospital);

        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la inserción es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la inserción falla
        }
    }

    // Método para borrar un miembro del personal
    public static function borrar_personal($cod_per) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de eliminación con parámetros
        $stmt = $connection->prepare("DELETE FROM personal WHERE cod_per = :cod_per"); 
        $stmt->bindParam(':cod_per', $cod_per);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la eliminación es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la eliminación falla
        }
    }

    // Método para actualizar la información de un miembro del personal
    public static function actualizar_personal($cod_per, $dni_per, $nombre, $apellidos, $salario, $contrato, $cod_hospital) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de actualización con parámetros
        $stmt = $connection->prepare('UPDATE personal SET dni_per=:dni_per, nombre=:nombre, apellidos=:apellidos, salario=:salario, contrato=:contrato, cod_hospital=:cod_hospital WHERE cod_per=:cod_per');
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':dni_per', $dni_per);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':salario', $salario);
        $stmt->bindParam(':contrato', $contrato);
        $stmt->bindParam(':cod_hospital', $cod_hospital);
        $stmt->bindParam(':cod_per', $cod_per);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la actualización es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la actualización falla
        }
    }
}
?>
