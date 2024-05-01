<?php
class Pacientes {
    // Método para mostrar todos los pacientes
    public static function mostrar_pacientes() {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar y ejecutar consulta SQL para seleccionar todos los pacientes
        $stmt = $connection->prepare("SELECT * FROM pacientes"); 
        if($stmt->execute()) {
            // Obtener resultados y devolver en formato JSON
            $result = $stmt->fetchAll();
            echo json_encode($result);
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la consulta es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la consulta falla
        }
    }

    // Método para crear un nuevo paciente
    public static function crear_pacientes($dni_pac, $nombre, $apellidos, $edad, $telefono, $cod_hospital, $cod_salas_espera) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de inserción con parámetros
        $stmt = $connection->prepare("INSERT INTO pacientes (dni_pac, nombre, apellidos, edad, telefono, cod_hospital, cod_salas_espera) 
            VALUES (:dni_pac, :nombre, :apellidos, :edad, :telefono, :cod_hospital, :cod_salas_espera)");
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':dni_pac', $dni_pac);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':edad', $edad);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':cod_hospital', $cod_hospital);
        $stmt->bindParam(':cod_salas_espera', $cod_salas_espera);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la inserción es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la inserción falla
        }
    }

    // Método para borrar un paciente
    public static function borrar_pacientes($cod_pac) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de eliminación con parámetros
        $stmt = $connection->prepare("DELETE FROM pacientes WHERE cod_pac = :cod_pac"); 
        $stmt->bindParam(':cod_pac', $cod_pac);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la eliminación es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la eliminación falla
        }
    }

    // Método para actualizar la información de un paciente
    public static function actualizar_pacientes($cod_pac, $dni_pac, $nombre, $apellidos, $edad, $telefono, $cod_hospital, $cod_salas_espera) {
        // Establecer conexión a la base de datos
        $database = new Database();
        $connection = $database->getConnection();
        
        // Preparar consulta SQL de actualización con parámetros
        $stmt = $connection->prepare('UPDATE pacientes SET dni_pac=:dni_pac, nombre=:nombre, apellidos=:apellidos, edad=:edad, telefono=:telefono, cod_hospital=:cod_hospital, cod_salas_espera=:cod_salas_espera WHERE cod_pac=:cod_pac');
        
        // Vincular parámetros con valores recibidos
        $stmt->bindParam(':dni_pac', $dni_pac);
        $stmt->bindParam(':nombre', $nombre);
        $stmt->bindParam(':apellidos', $apellidos);
        $stmt->bindParam(':edad', $edad);
        $stmt->bindParam(':telefono', $telefono);
        $stmt->bindParam(':cod_hospital', $cod_hospital);
        $stmt->bindParam(':cod_salas_espera', $cod_salas_espera);
        $stmt->bindParam(':cod_pac', $cod_pac);
        
        // Ejecutar la consulta y establecer código de respuesta apropiado
        if($stmt->execute()) {
            header('HTTP/1.1 200 OK'); // Establecer código de respuesta 200 si la actualización es exitosa
        } else {
            header('HTTP/1.1 404 NO'); // Establecer código de respuesta 404 si la actualización falla
        }
    }
}
?>
