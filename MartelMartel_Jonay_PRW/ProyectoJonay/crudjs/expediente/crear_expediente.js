// Función para crear un nuevo expediente mediante una solicitud POST al servidor
function crearExpediente(ExpedienteNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/expediente/crear_expediente.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Expediente creado exitosamente');
                window.location.href = "expediente.html";
            } else {
                console.error('Error al crear el expediente. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el expediente.');
    };

    xhr.send(JSON.stringify(ExpedienteNuevo));
}

// Event listener que espera a que el DOM se cargue completamente para agregar funcionalidad al formulario de creación de expediente
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioExpediente');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const ExpedienteNuevo = {};

        for (const [key, value] of formData.entries()) {
            ExpedienteNuevo[key] = value;
        }

        crearExpediente(ExpedienteNuevo);
    });

    // Función para cargar la lista de pacientes en el formulario de creación de expediente
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

});