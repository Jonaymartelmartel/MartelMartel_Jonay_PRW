// Esta función envía una solicitud DELETE para eliminar un tipo de médico
function borrar_tipo_medicos(id_tipo_medicos) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_medicos/borrar_tipo_medicos.php/?id_tipo_medicos=${id_tipo_medicos}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Tipo médico eliminado exitosamente');
                window.location.href = "tipo_medicos.html";
            } else {
                console.error('Error al eliminar el tipo médico. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el medico');
    };
    xhr.send();
}