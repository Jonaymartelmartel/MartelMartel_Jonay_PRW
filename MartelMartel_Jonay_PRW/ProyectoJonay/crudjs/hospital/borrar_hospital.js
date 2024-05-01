// Función para borrar un hospital mediante una solicitud DELETE al servidor
function borrar_hospital(cod_hospital) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/hospital/borrar_hospital.php/?cod_hospital=${cod_hospital}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Hospital eliminado exitosamente');
                window.location.href = "hospital.html";
            } else {
                console.error('Error al eliminar el hospital. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el hospital.');
    };
    xhr.send();
}
