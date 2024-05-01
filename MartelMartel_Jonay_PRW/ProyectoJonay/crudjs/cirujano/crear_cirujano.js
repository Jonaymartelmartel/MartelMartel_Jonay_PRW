// Función para crear un nuevo cirujano
// Envia una solicitud POST al servidor con los datos del nuevo cirujano y redirige a la página de cirujanos
function crearCirujano(CirujanoNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/cirujano/crear_acirujano.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Cirujano creado exitosamente');
                window.location.href = "cirujano.html";
            } else {
                console.error('Error al crear el cirujano. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el cirujano.');
    };

    xhr.send(JSON.stringify(CirujanoNuevo));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioCirujano');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const CirujanoNuevo = {};

        for (const [key, value] of formData.entries()) {
            CirujanoNuevo[key] = value;
        }

        crearCirujano(CirujanoNuevo);
    });

    // Función para cargar los tipos de médicos desde el servidor
// Envia una solicitud GET para obtener los tipos de médicos disponibles
    function cargarTipoMedicos() {
        const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/tipo_medicos/mostrar_tipo_medicos.php';
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    const selecttipo_medicos = document.getElementById('id_tipo_medicos');
                    data.forEach(tipo_medicos => {
                        const option = document.createElement('option');
                        option.value = tipo_medicos.id_tipo_medicos;
                        option.textContent = `${tipo_medicos.id_tipo_medicos} - ${tipo_medicos.nombre}`;
                        selecttipo_medicos.appendChild(option);
                    });
                } else {
                    throw new Error('Error al cargar los tipo_medicos.');
                }
            };
            xhr.onerror = function() {
                throw new Error('Error de red al cargar los tipo_medicos.');
            };
            xhr.send();
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    cargarTipoMedicos();
    
});