// Función para borrar una sala de espera mediante su código
function borrar_salas(cod_salas_espera) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/salas_espera/borrar_salas_espera.php/?cod_salas_espera=${cod_salas_espera}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Sala eliminada exitosamente');
                window.location.href = "salas_espera.html";
            } else {
                console.error('Error al eliminar la sala. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el producto.');
    };
    xhr.send();
}