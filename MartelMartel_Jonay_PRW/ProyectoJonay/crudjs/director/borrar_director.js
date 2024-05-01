// Función para eliminar un director mediante una solicitud DELETE al servidor
function borrar_director(cod_director) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/director/borrar_director.php/?cod_director=${cod_director}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Director eliminado exitosamente');
                window.location.href = "director.html";
            } else {
                console.error('Error al eliminar el director. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el director.');
    };
    xhr.send();
}