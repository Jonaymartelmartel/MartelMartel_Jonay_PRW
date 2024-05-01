// Función para editar un hospital existente mediante una solicitud PUT al servidor
function editarHospital(cod_hospital, hospitalActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/hospital/actualizar_hospital.php/?cod_hospital=${cod_hospital}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Hospital actualizado exitosamente');
                window.location.href = "hospital.html";
            } else {
                console.error('Error al actualizar el hospital. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar el hospital.');
    };

    xhr.send(JSON.stringify(hospitalActualizado));
}

// Función para obtener los datos de un hospital específico mediante una solicitud GET al servidor
function obtenerDatosHospital(cod_hospital) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/hospital/mostrar_hospital.php/?cod_hospital=${cod_hospital}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const hospital = JSON.parse(xhr.responseText);
                llenarFormulario(hospital);
            } else {
                console.error('Error al cargar los datos de la sala. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos de la sala.');
    };

    xhr.send();
}

// Función para llenar el formulario de hospital con los datos obtenidos del servidor
function llenarFormulario(hospital) {
        document.getElementById('cod_hospital').value = hospital.cod_hospital;
        document.getElementById('cif_hospital').value = hospital.cif_hospital;
        document.getElementById('nombre').value = hospital.nombre;
        document.getElementById('direccion').value = hospital.direccion;
        document.getElementById('localidad').value = hospital.localidad;
        document.getElementById('telefono').value = hospital.telefono;
}

// Event listener que espera a que el DOM se cargue completamente para agregar funcionalidad al formulario de edición de hospital
document.addEventListener('DOMContentLoaded', function () {
    const editarHospitalBtn = document.getElementById('editarHospitalBtn');
    if (editarHospitalBtn) {
        editarHospitalBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioHospital'));
            const hospitalActualizado = {};

            for (const [key, value] of formData.entries()) {
                hospitalActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_hospital = urlParams.get('cod_hospital');

            if (cod_hospital) {
                editarHospital(cod_hospital, hospitalActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el hospital.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_hospital = urlParams.get('cod_hospital');

    if (cod_hospital) {
        obtenerDatosHospital(cod_hospital);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del hospital.');
    }
});