// Función para eliminar un registro de personal
function borrar_personal(cod_per) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/personal/borrar_personal.php/?cod_per=${cod_per}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Personal eliminada exitosamente');
                window.location.href = "personal.html";
            } else {
                console.error('Error al eliminar la persona. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar la persona.');
    };
    xhr.send();
}