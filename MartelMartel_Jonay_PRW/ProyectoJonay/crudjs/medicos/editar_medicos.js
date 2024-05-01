// Función para editar un médico existente mediante una solicitud PUT al servidor
function editarMedicos(cod_medicos, MedicoActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/medicos/actualizar_medicos.php/?cod_medicos=${cod_medicos}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('medicos actualizada exitosamente');
                window.location.href = "medicos.html";
            } else {
                console.error('Error al actualizar el medicos. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar la medicos.');
    };

    xhr.send(JSON.stringify(MedicoActualizado));
}

// Función para obtener los datos de un médico específico mediante una solicitud GET al servidor
function obtenerDatosMedicos(cod_medicos) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/medicos/mostrar_medicos.php/?cod_medicos=${cod_medicos}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const medicos = JSON.parse(xhr.responseText);
                llenarFormulario(medicos);
            } else {
                console.error('Error al cargar los datos del medicos. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del medicos.');
    };

    xhr.send();
}


// Función para llenar el formulario de médico con los datos obtenidos del servidor
function llenarFormulario(medicos) {
    document.getElementById('cod_medicos').value = medicos.cod_medicos;
    document.getElementById('nombre').value = medicos.nombre;
    document.getElementById('especialidad').value = medicos.especialidad;
    document.getElementById('id_tipo_personal').value = medicos.id_tipo_personal;
}

// Event listener que espera a que el DOM se cargue completamente para agregar funcionalidad al formulario de edición de médicos
document.addEventListener('DOMContentLoaded', function () {
    const editarMedicosBtn = document.getElementById('editarMedicosBtn');
    if (editarMedicosBtn) {
        editarMedicosBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioMedicos'));
            const MedicoActualizado = {};

            for (const [key, value] of formData.entries()) {
                MedicoActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_medicos = urlParams.get('cod_medicos');

            if (cod_medicos) {
                editarMedicos(cod_medicos, MedicoActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el medico');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_medicos = urlParams.get('cod_medicos');

    if (cod_medicos) {
        obtenerDatosMedicos(cod_medicos);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del medico.');
    }

function cargarTipoPersonal() {
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/tipo_personal/mostrar_tipo_personal.php';
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const selecttipo_personal = document.getElementById('id_tipo_personal');
                data.forEach(tipo_personal => {
                    const option = document.createElement('option');
                    option.value = tipo_personal.id_tipo_personal;
                    option.textContent = `${tipo_personal.id_tipo_personal} - ${tipo_personal.nombre}`;
                    selecttipo_personal.appendChild(option);
                });
            } else {
                throw new Error('Error al cargar los tipo_personal.');
            }
        };
        xhr.onerror = function() {
            throw new Error('Error de red al cargar los tipo_personal.');
        };
        xhr.send();
    } catch (error) {
        console.error('Error:', error);
    }
}

cargarTipoPersonal();

function cargarPersonal() {
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/personal/mostrar_personal.php';
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const selectpersonal = document.getElementById('id_tipo_personal');
                data.forEach(personal => {
                    const option = document.createElement('option');
                    option.value = personal.id_tipo_personal;
                    option.textContent = `${personal.id_tipo_personal} - ${personal.nombre}`;
                    selectpersonal.appendChild(option);
                });
            } else {
                throw new Error('Error al cargar los personal.');
            }
        };
        xhr.onerror = function() {
            throw new Error('Error de red al cargar los personal.');
        };
        xhr.send();
    } catch (error) {
        console.error('Error:', error);
    }
}

cargarPersonal();

});