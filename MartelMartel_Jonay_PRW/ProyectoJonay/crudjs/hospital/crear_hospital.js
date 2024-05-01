// Función para crear un hospital mediante una solicitud POST al servidor
function crearHospital(HospitalNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/hospital/crear_hospital.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Hospital creada exitosamente');
                window.location.href = "hospital.html";
            } else {
                console.error('Error al crear la hospital. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear la hospital.');
    };

    xhr.send(JSON.stringify(HospitalNuevo));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioHospital');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const HospitalNuevo = {};

        for (const [key, value] of formData.entries()) {
            HospitalNuevo[key] = value;
        }

        crearHospital(HospitalNuevo);
    });
});