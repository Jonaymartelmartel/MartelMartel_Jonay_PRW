// Función para crear un nuevo médico mediante una solicitud POST al servidor
function crearMedicos(MedicosNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/medicos/crear_medicos.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Medico creado exitosamente');
                window.location.href = "medicos.html";
            } else {
                console.error('Error al crear el medico. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el medico.');
    };

    xhr.send(JSON.stringify(MedicosNuevo));
}

// Event listener que espera a que el DOM se cargue completamente para agregar funcionalidad al formulario de creación de médicos
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioMedicos');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const MedicosNuevo = {};

        for (const [key, value] of formData.entries()) {
            MedicosNuevo[key] = value;
        }

        crearMedicos(MedicosNuevo);
    });

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