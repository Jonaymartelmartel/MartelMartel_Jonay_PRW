// Esta función envía una solicitud POST para crear un nuevo tipo de médico
function crearTipoMedicos(TipoMedicosNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_medicos/crear_tipo_medicos.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Tipo medicos creado exitosamente');
                window.location.href = "tipo_medicos.html";
            } else {
                console.error('Error al crear el tipo medico. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el tipo medico.');
    };

    xhr.send(JSON.stringify(TipoMedicosNuevo));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioTipoMedicos');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const TipoMedicosNuevo = {};

        for (const [key, value] of formData.entries()) {
            TipoMedicosNuevo[key] = value;
        }

        crearTipoMedicos(TipoMedicosNuevo);
    });
    // Esta función carga la lista de médicos para el formulario
    function cargarMedicos() {
        const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/medicos/mostrar_medicos.php';
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    const selectMedicos = document.getElementById('cod_medicos');
                    data.forEach(medicos => {
                        const option = document.createElement('option');
                        option.value = medicos.cod_medicos;
                        option.textContent = `${medicos.cod_medicos} - ${medicos.cod_medicos}`;
                        selectMedicos.appendChild(option);
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
    
    cargarMedicos();
});