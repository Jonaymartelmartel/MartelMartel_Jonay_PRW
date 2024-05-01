// Función para eliminar un médico mediante una solicitud DELETE al servidor
function borrar_medicos(cod_medicos) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/medicos/borrar_medicos.php/?cod_medicos=${cod_medicos}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Medico eliminado exitosamente');
                window.location.href = "medicos.html";
            } else {
                console.error('Error al eliminar el medicos. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el medico');
    };
    xhr.send();
}