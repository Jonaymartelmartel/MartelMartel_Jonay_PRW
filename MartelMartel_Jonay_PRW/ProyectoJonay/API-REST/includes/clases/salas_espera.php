<?php
    class Salas {
        public static function mostrar_salas_espera() {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("SELECT * FROM salas_espera");  //Hacemos la consulta SQL
            if($stmt->execute()) {
                $result = $stmt->fetchAll();    // Si todo se ejecuta correctamente se obtienen todos los resultados
                echo json_encode($result);     // Y estos resultados salen en formato JSON y se muestran
                header('HTTP/1.1 200 OK');
            } else {    //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');                        
            }
        }
        // Método para crear las salas
        public static function crear_salas($num_sillas, $cod_hospital) {

            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("INSERT INTO salas_espera (num_sillas, cod_hospital) 
                VALUES (:num_sillas, :cod_hospital)"); //Hacemos la consulta SQL

            $stmt->bindParam(':num_sillas', $num_sillas); //Estos son los paremetros de la consulta SQL
            $stmt->bindParam(':cod_hospital', $cod_hospital);
            if($stmt->execute()) {
                header('HTTP/1.1 200 OK');
            } else {    //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');                        
            }
        }

        // Método para borrar las salas
        public static function borrar_salas($cod_salas_espera) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("DELETE FROM salas_espera WHERE cod_salas_espera = :cod_salas_espera"); //Hacemos la consulta SQL
            $stmt->bindParam(':cod_salas_espera', $cod_salas_espera); //Estos son los paremetros de la consulta SQL
            if($stmt->execute()) {
                header('HTTP/1.1 200 OK');
            } else {    //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');                        
            }
        }

        // Método para actualizar las salas
        public static function actualizar_salas($cod_salas_espera, $num_sillas, $cod_hospital) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare('UPDATE salas_espera SET num_sillas=:num_sillas, cod_hospital=:cod_hospital WHERE cod_salas_espera=:cod_salas_espera');
            //Hacemos la consulta SQL

            $stmt->bindParam(':cod_salas_espera', $cod_salas_espera); //Estos son los paremetros de la consulta SQL
            $stmt->bindParam(':num_sillas', $num_sillas);
            $stmt->bindParam(':cod_hospital', $cod_hospital);
            
            if($stmt->execute()) {
                header('HTTP/1.1 200 OK');
            } else {    //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');                        
            }
        }
    }
?>