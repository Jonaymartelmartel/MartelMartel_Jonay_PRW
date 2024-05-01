// Esta función envía una solicitud DELETE para eliminar un tipo de personal
function borrar_tipo_personal(id_tipo_personal) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_personal/borrar_tipo_personal.php/?id_tipo_personal=${id_tipo_personal}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Tipo personal eliminado exitosamente');
                window.location.href = "tipo_personal.html";
            } else {
                console.error('Error al eliminar el tipo personal. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el tipo personal');
    };
    xhr.send();
}