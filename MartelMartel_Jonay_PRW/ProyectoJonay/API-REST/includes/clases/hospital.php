<?php
    class Hospital {

        // Método para mostrar los hospitales
        public static function mostrar_hospital() {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos
            
            $stmt = $connection->prepare("SELECT * FROM hospital"); //Hacemos la consulta SQL para mostrar los hospitales
            if($stmt->execute()) {
                $result = $stmt->fetchAll();    // Si todo se ejecuta correctamente se obtienen todos los resultados
                echo json_encode($result);     // Y estos resultados salen en formato JSON y se muestran
                header('HTTP/1.1 200 OK');
            } else {    //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');                        
            }
        }

        // Método para crear hospital
        public static function crear_hospital($cif_hospital, $nombre, $direccion, $localidad, $telefono) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("INSERT INTO hospital (cif_hospital, nombre, direccion, localidad, telefono) 
                VALUES (:cif_hospital, :nombre, :direccion, :localidad, :telefono)"); //Hacemos la consulta SQL para crear los hospitales

            $stmt->bindParam(':cif_hospital', $cif_hospital);  //Estos son los paremetros de la consulta SQL 
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':direccion', $direccion);
            $stmt->bindParam(':localidad', $localidad);
            $stmt->bindParam(':telefono', $telefono);

            if($stmt->execute()) {          //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {                            
                header('HTTP/1.1 404 NO');
            }
        }

        // Método para borrar un hospital
        public static function borrar_hospital($cod_hospital) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("DELETE FROM hospital WHERE cod_hospital = :cod_hospital");  //Hacemos la consulta SQL para borrar el hospital 
                                                                                                    //dependiendo del cod_hospital que se haya seleccionado
            $stmt->bindParam(':cod_hospital', $cod_hospital); //Este es el paremetro de la consulta SQL
            
            if($stmt->execute()) {              //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {
                header('HTTP/1.1 404 NO');
            }
        }

        // Método para actualizar un hospital
        public static function actualizar_hospital($cod_hospital, $cif_hospital, $nombre, $direccion, $localidad, $telefono) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare('UPDATE hospital SET cif_hospital=:cif_hospital, nombre=:nombre, direccion=:direccion, localidad=:localidad, telefono=:telefono WHERE cod_hospital=:cod_hospital');
            //Hacemos la consulta SQL para actualizar el hospital seleccionado

            $stmt->bindParam(':cod_hospital', $cod_hospital); //Estos son los paremetros de la consulta SQL
            $stmt->bindParam(':cif_hospital', $cif_hospital);
            $stmt->bindParam(':nombre', $nombre);
            $stmt->bindParam(':direccion', $direccion);
            $stmt->bindParam(':localidad', $localidad);
            $stmt->bindParam(':telefono', $telefono);

            if($stmt->execute()) {        //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {
                header('HTTP/1.1 404 NO');
            }
        }
    }
?>