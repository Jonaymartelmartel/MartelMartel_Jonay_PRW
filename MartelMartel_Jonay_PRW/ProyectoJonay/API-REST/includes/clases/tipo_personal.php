<?php

    class Tipo_personal {
        // Método para mostrar los tipo_personal
        public static function mostrar_tipo_personal() {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("SELECT * FROM tipo_personal"); //Hacemos la consulta SQL para mostrar los hospitales
            if($stmt->execute()) {
                $result = $stmt->fetchAll();    // Si todo se ejecuta correctamente se obtienen todos los resultados
                echo json_encode($result);     // Y estos resultados salen en formato JSON y se muestran
                header('HTTP/1.1 200 OK');
            } else {                            //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');  
            }
        }

        // Método para crear los tipo_personal
        public static function crear_tipo_personal($tipo_personal, $cod_per) {

            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("INSERT INTO tipo_personal (tipo_personal, cod_per) 
                VALUES (:tipo_personal, :cod_per)"); //Hacemos la consulta SQL

            $stmt->bindParam(':tipo_personal', $tipo_personal); //Estos son los paremetros de la consulta SQL 
            $stmt->bindParam(':cod_per', $cod_per);
            if($stmt->execute()) {
                header('HTTP/1.1 200 OK');
            } else {                            //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');  
            }
        }

        // Método para borrar los tipo_personal
        public static function borrar_tipo_personal($id_tipo_personal) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos
            $stmt = $connection->prepare("DELETE FROM tipo_personal WHERE id_tipo_personal = :id_tipo_personal");  //Hacemos la consulta SQL
            $stmt->bindParam(':id_tipo_personal', $id_tipo_personal); //Estos son los paremetros de la consulta SQL 
            if($stmt->execute()) {
                header('HTTP/1.1 200 OK');
            } else {                           //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');  
            }
        }

        // Método para actualizar los tipo_personal
        public static function actualizar_tipo_personal($id_tipo_personal, $tipo_personal, $cod_per) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare('UPDATE tipo_personal SET tipo_personal=:tipo_personal, cod_per=:cod_per WHERE id_tipo_personal=:id_tipo_personal'); //Hacemos la consulta SQL
            
            $stmt->bindParam(':id_tipo_personal', $id_tipo_personal); //Estos son los paremetros de la consulta SQL 
            $stmt->bindParam(':tipo_personal', $tipo_personal);
            $stmt->bindParam(':cod_per', $cod_per);
            
            if($stmt->execute()) {
                header('HTTP/1.1 200 OK');
            } else {                           //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
            }
        }
    }
?>