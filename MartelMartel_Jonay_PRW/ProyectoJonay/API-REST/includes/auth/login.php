<?php
session_start();
$response = array(); // Array para almacenar la respuesta

if($_SERVER["REQUEST_METHOD"] == "POST") {
    require_once('../conexion/bd.php'); // Incluye el archivo de conexión a la base de datos

    // Obtener datos del formulario de inicio de sesión
    $usuario = $_POST['usuario'];
    $contrasena = $_POST['contrasena'];

    // Consulta SQL para verificar las credenciales del usuario
    $sql = "SELECT * FROM usuario WHERE usuario = :usuario AND contrasena = :contrasena";
    
    // Establecer conexión a la base de datos y preparar la consulta
    $database = new Database();
    $connection = $database->getConnection();
    $stmt = $connection->prepare($sql);
    $stmt->bindParam(':usuario', $usuario);
    $stmt->bindParam(':contrasena', $contrasena);
    
    // Ejecutar la consulta SQL
    if($stmt->execute()) {
        // Verificar si se encontró un registro con las credenciales proporcionadas
        if($stmt->rowCount() == 1) {
            // Iniciar sesión y redirigir al usuario a la página principal
            $_SESSION['usuario'] = $usuario;
            $response['success'] = true;
            $response['message'] = "Credenciales correctas";
            $response['redirect'] = "./vistas/hospital/hospital.html";
        } else {
            // Credenciales incorrectas
            $response['success'] = false;
            $response['message'] = "Credenciales incorrectas";
        }
    } else {
        // Error al ejecutar la consulta SQL
        $response['success'] = false;
        $response['message'] = "Error al intentar iniciar sesión";
    }
}

header('Content-Type: application/json');
echo json_encode($response);
?>
