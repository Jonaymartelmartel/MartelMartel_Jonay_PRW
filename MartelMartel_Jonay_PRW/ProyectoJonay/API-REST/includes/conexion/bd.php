<?php
class Database{
    // Variables para la conexión a la base de datos
    private $host = 'localhost:3307';
    private $user = 'root';
    private $password = '';
    private $database = 'hospitaldb';

    // Método para obtener una conexión a la base de datos
    public function getConnection(){
        // Construir la cadena de conexión
        $hostDB = "mysql:host=".$this->host.";dbname=".$this->database.";";
        try{
            // Intentar establecer la conexión utilizando PDO
            $connection = new PDO($hostDB,$this->user,$this->password);
            $connection->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            return $connection;
        } catch(PDOException $e){
            echo("ERROR: ".$e->getMessage()); // Manejar cualquier error de conexión
        }
    }
}
?>
