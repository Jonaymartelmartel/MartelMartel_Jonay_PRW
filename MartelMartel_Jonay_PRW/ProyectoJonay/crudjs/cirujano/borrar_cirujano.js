// Función para borrar un cirujano según su código de cirujano
// Envia una solicitud DELETE al servidor para eliminar el cirujano con el código proporcionado
function borrar_cirujano(cod_cirujano) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/cirujano/borrar_cirujano.php/?cod_cirujano=${cod_cirujano}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Cirujano eliminado exitosamente');
                window.location.href = "cirujano.html";
            } else {
                console.error('Error al eliminar el cirujano. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el cirujano.');
    };
    xhr.send();
}