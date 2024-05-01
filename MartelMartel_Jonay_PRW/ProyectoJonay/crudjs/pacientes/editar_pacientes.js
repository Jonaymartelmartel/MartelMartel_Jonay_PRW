// Función para editar un paciente existente mediante una solicitud PUT al servidor
function editarPacientes(cod_pac, pacienteActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/pacientes/actualizar_pacientes.php/?cod_pac=${cod_pac}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Paciente actualizado exitosamente');
                window.location.href = "pacientes.html";
            } else {
                console.error('Error al actualizar el paciente. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar el paciente.');
    };

    xhr.send(JSON.stringify(pacienteActualizado));
}

// Función para obtener los datos de un paciente específico mediante una solicitud GET al servidor
function obtenerDatosPacientes(cod_pac) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/pacientes/mostrar_pacientes.php/?cod_pac=${cod_pac}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const pacientes = JSON.parse(xhr.responseText);
                llenarFormulario(pacientes);
            } else {
                console.error('Error al cargar los datos del paciente. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del paciente.');
    };

    xhr.send();
}

// Función para llenar el formulario de pacientes con los datos obtenidos del servidor
function llenarFormulario(pacientes) {
        document.getElementById('cod_pac').value = pacientes.cod_pac;
        document.getElementById('dni_pac').value = pacientes.dni_pac;
        document.getElementById('nombre').value = pacientes.nombre;
        document.getElementById('apellidos').value = pacientes.apellidos;
        document.getElementById('edad').value = pacientes.edad;
        document.getElementById('telefono').value = pacientes.telefono;
        document.getElementById('cod_hospital').value = pacientes.cod_hospital;
        document.getElementById('cod_salas_espera').value = pacientes.cod_salas_espera;
}

document.addEventListener('DOMContentLoaded', function () {
    const editarPacientesBtn = document.getElementById('editarPacientesBtn');
    if (editarPacientesBtn) {
        editarPacientesBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioPacientes'));
            const pacienteActualizado = {};

            for (const [key, value] of formData.entries()) {
                pacienteActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_pac = urlParams.get('cod_pac');

            if (cod_pac) {
                editarPacientes(cod_pac, pacienteActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el paciente.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_pac = urlParams.get('cod_pac');

    if (cod_pac) {
        obtenerDatosPacientes(cod_pac);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del paciente.');
    }
});

// Función para cargar la lista de hospitales en el formulario de pacientes
function cargarHospitales() {
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/hospital/mostrar_hospital.php';
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const selectHospital = document.getElementById('cod_hospital');
                data.forEach(hospital => {
                    const option = document.createElement('option');
                    option.value = hospital.cod_hospital;
                    option.textContent = `${hospital.cod_hospital} - ${hospital.nombre}`;
                    selectHospital.appendChild(option);
                });
            } else {
                throw new Error('Error al cargar los hospitales.');
            }
        };
        xhr.onerror = function() {
            throw new Error('Error de red al cargar los hospitales.');
        };
        xhr.send();
    } catch (error) {
        console.error('Error:', error);
    }
}

cargarHospitales();

// Función para cargar la lista de salas de espera en el formulario de pacientes
function cargarSalas() {
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/salas_espera/mostrar_salas_espera.php';
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const selectSalas = document.getElementById('cod_salas_espera');
                data.forEach(salas_espera => {
                    const option = document.createElement('option');
                    option.value = salas_espera.cod_salas_espera;
                    option.textContent = `${salas_espera.cod_salas_espera} - ${salas_espera.num_sillas} sillas`;
                    selectSalas.appendChild(option);
                });
            } else {
                throw new Error('Error al cargar las salas.');
            }
        };
        xhr.onerror = function() {
            throw new Error('Error de red al cargar las salas');
        };
        xhr.send();
    } catch (error) {
        console.error('Error:', error);
    }
}

cargarSalas();