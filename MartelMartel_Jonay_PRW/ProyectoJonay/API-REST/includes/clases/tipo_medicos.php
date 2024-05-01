<?php

    class Tipo_medicos {
        // Método para mostrar los tipo_medicos
        public static function mostrar_tipo_medicos() {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("SELECT * FROM tipo_medicos");  //Hacemos la consulta SQL
            if($stmt->execute()) {
                $result = $stmt->fetchAll();
                echo json_encode($result);
                header('HTTP/1.1 200 OK');
            } else {            //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');
            }
        }

        // Método para crear los tipo_medicos
        public static function crear_tipo_medicos($tipo_medicos, $cod_medicos) {

            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("INSERT INTO tipo_medicos (tipo_medicos, cod_medicos) 
                VALUES (:tipo_medicos, :cod_medicos)"); //Hacemos la consulta SQL

            $stmt->bindParam(':tipo_medicos', $tipo_medicos); //Estos son los paremetros de la consulta SQL
            $stmt->bindParam(':cod_medicos', $cod_medicos);

            if($stmt->execute()) {              //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {
                header('HTTP/1.1 404 NO');
            }
        }

        // Método para borrar los tipo_medicos
        public static function borrar_tipo_medicos($id_tipo_medicos) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("DELETE FROM tipo_medicos WHERE id_tipo_medicos = :id_tipo_medicos");  //Hacemos la consulta SQL
            $stmt->bindParam(':id_tipo_medicos', $id_tipo_medicos); //Estos son los paremetros de la consulta SQL

            if($stmt->execute()) {              //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {
                header('HTTP/1.1 404 NO');
            }
        }

        // Método para actualizar los tipo_medicos
        public static function actualizar_tipo_medicos($id_tipo_medicos, $tipo_medicos, $cod_medicos) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare('UPDATE tipo_medicos SET tipo_medicos=:tipo_medicos, cod_medicos=:cod_medicos WHERE id_tipo_medicos=:id_tipo_medicos'); //Hacemos la consulta SQL
            
            $stmt->bindParam(':id_tipo_medicos', $id_tipo_medicos); //Estos son los paremetros de la consulta SQL
            $stmt->bindParam(':tipo_medicos', $tipo_medicos);
            $stmt->bindParam(':cod_medicos', $cod_medicos);
            
            if($stmt->execute()) {              //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {
                header('HTTP/1.1 404 NO');
            }
        }
    }
?>