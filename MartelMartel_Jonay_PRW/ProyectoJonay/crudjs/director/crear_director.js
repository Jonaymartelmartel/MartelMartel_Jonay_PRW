// Función para crear un nuevo director mediante una solicitud POST al servidor
function crearDirector(DirectorNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/director/crear_director.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Director creado exitosamente');
                window.location.href = "director.html";
            } else {
                console.error('Error al crear el director. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el director.');
    };

    xhr.send(JSON.stringify(DirectorNuevo));
}

// Event listener que escucha el evento 'DOMContentLoaded' para el formulario del director
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioDirector');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const DirectorNuevo = {};

        for (const [key, value] of formData.entries()) {
            DirectorNuevo[key] = value;
        }

        crearDirector(DirectorNuevo);
    });
    // Función para cargar los tipos de personal disponibles desde el servidor
    
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
    
});