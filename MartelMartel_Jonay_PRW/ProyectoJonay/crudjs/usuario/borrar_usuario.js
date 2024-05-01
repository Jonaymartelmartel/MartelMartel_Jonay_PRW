// Función para eliminar un usuario mediante su ID
function borrar_usuario(id_usuario) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/usuario/borrar_usuario.php/?id_usuario=${id_usuario}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('usuario eliminada exitosamente');
                window.location.href = "usuario.html";
            } else {
                console.error('Error al eliminar el usuario. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el usuario.');
    };
    xhr.send();
}