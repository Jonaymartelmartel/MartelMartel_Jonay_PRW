// Función para eliminar un expediente mediante una solicitud DELETE al servidor
function borrar_expediente(cod_expediente) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/expediente/borrar_expediente.php/?cod_expediente=${cod_expediente}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Expediente eliminado exitosamente');
                window.location.href = "expediente.html";
            } else {
                console.error('Error al eliminar el expediente. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el expediente.');
    };
    xhr.send();
}