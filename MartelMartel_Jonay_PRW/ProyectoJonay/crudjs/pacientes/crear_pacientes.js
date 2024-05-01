// Función para crear un nuevo paciente mediante una solicitud POST al servidor
function crearPacientes(PacienteNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/pacientes/crear_pacientes.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Paciente creado exitosamente');
                window.location.href = "pacientes.html";
            } else {
                console.error('Error al crear el paciente. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el paciente.');
    };

    xhr.send(JSON.stringify(PacienteNuevo));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioPacientes');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const PacienteNuevo = {};

        for (const [key, value] of formData.entries()) {
            PacienteNuevo[key] = value;
        }

        crearPacientes(PacienteNuevo);
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
});

