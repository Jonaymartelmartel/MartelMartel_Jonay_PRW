<?php
    class Usuario {
         // Método para mostrar los usuario
        public static function mostrar_usuario() {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("SELECT * FROM usuario"); //Hacemos la consulta SQL para mostrar los usuarios
            if($stmt->execute()) {
                $result = $stmt->fetchAll();    // Si todo se ejecuta correctamente se obtienen todos los resultados
                echo json_encode($result);     // Y estos resultados salen en formato JSON y se muestran

                header('HTTP/1.1 200 OK');
            } else {                            //Dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 404 NO');
            }
        }

        // Método para crear usuario
        public static function crear_usuario($usuario, $contrasena) {

            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("INSERT INTO usuario (usuario, contrasena) 
                VALUES (:usuario, :contrasena)");       //Hacemos la consulta SQL para crear los usuarios

            $stmt->bindParam(':usuario', $usuario);
            $stmt->bindParam(':contrasena', $contrasena);
            if($stmt->execute()) {          //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {                            
                header('HTTP/1.1 404 NO');
            }
        }

        // Método para borrar un usuario
        public static function borrar_usuario($id_usuario) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare("DELETE FROM usuario WHERE id_usuario = :id_usuario");  //Hacemos la consulta SQL para borrar el hospital 
                                                                                                //dependiendo del id_usuario que se haya seleccionado

            $stmt->bindParam(':id_usuario', $id_usuario); //Este es el paremetro de la consulta SQL
            if($stmt->execute()) {          //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {                            
                header('HTTP/1.1 404 NO');
            }
        }
// Método para actualizar un usuario
        public static function actualizar_usuario($id_usuario, $usuario, $contrasena) {
            $database = new Database();                         // Creamos una instancia de la clase Database para manejar la conexión a la base de datos                 
            $connection = $database->getConnection();           // Y obtenemos la conexión a la base de datos

            $stmt = $connection->prepare('UPDATE usuario SET usuario=:usuario, contrasena=:contrasena WHERE id_usuario=:id_usuario'); //Hacemos la consulta SQL para actualizar el usuario seleccionado
            
            $stmt->bindParam(':id_usuario', $id_usuario); //Estos son los paremetros de la consulta SQL
            $stmt->bindParam(':usuario', $usuario);
            $stmt->bindParam(':contrasena', $contrasena);
            
            if($stmt->execute()) {          //Tras ejecutarse la consulta dependiendo si el resultado es correcto o no se muestra uno u otro mensaje
                header('HTTP/1.1 200 OK');
            } else {                            
                header('HTTP/1.1 404 NO');
            }
        }
    }
?>