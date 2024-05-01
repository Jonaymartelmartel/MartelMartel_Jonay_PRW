// Función para editar un expediente existente mediante una solicitud PUT al servidor
function editarExpediente(cod_expediente, expedienteActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/expediente/actualizar_expediente.php/?cod_expediente=${cod_expediente}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Expediente actualizado exitosamente');
                window.location.href = "expediente.html";
            } else {
                console.error('Error al actualizar el expediente. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar el expediente.');
    };

    xhr.send(JSON.stringify(expedienteActualizado));
}


// Función para obtener los datos de un expediente específico mediante una solicitud GET al servidor
function obtenerDatosExpediente(cod_expediente) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/expediente/mostrar_expediente.php/?cod_expediente=${cod_expediente}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const expediente = JSON.parse(xhr.responseText);
                llenarFormulario(expediente);
            } else {
                console.error('Error al cargar los datos del expediente. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del expediente.');
    };

    xhr.send();
}

// Función para llenar el formulario de expediente con los datos obtenidos del servidor
function llenarFormulario(expediente) {
        document.getElementById('cod_expediente').value = expediente.cod_expediente;
        document.getElementById('vacunas').value = expediente.vacunas;
        document.getElementById('historial_medico').value = expediente.historial_medico;
        document.getElementById('enfermedades').value = expediente.enfermedades;
        document.getElementById('cod_pac').value = expediente.cod_pac;
}

// Event listener que espera a que el DOM se cargue completamente para agregar funcionalidad al formulario de edición de expediente
document.addEventListener('DOMContentLoaded', function () {
    const editarExpedienteBtn = document.getElementById('editarExpedienteBtn');
    if (editarExpedienteBtn) {
        editarExpedienteBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioExpediente'));
            const expedienteActualizado = {};

            for (const [key, value] of formData.entries()) {
                expedienteActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_expediente = urlParams.get('cod_expediente');

            if (cod_expediente) {
                editarExpediente(cod_expediente, expedienteActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el expediente.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_expediente = urlParams.get('cod_expediente');

    if (cod_expediente) {
        obtenerDatosExpediente(cod_expediente);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del expediente.');
    }
});

// Función para cargar la lista de pacientes en el formulario de expediente
function cargarPacientes() {
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/pacientes/mostrar_pacientes.php';
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const selectPacientes = document.getElementById('cod_pac');
                data.forEach(pacientes => {
                    const option = document.createElement('option');
                    option.value = pacientes.cod_pac;
                    option.textContent = `${pacientes.cod_pac} - ${pacientes.nombre}`;
                    selectPacientes.appendChild(option);
                });
            } else {
                throw new Error('Error al cargar los pacientes.');
            }
        };
        xhr.onerror = function() {
            throw new Error('Error de red al cargar los pacientes.');
        };
        xhr.send();
    } catch (error) {
        console.error('Error:', error);
    }
}

cargarPacientes();