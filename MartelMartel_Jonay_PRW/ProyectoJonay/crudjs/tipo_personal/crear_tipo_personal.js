// Esta función envía una solicitud POST para crear un nuevo tipo de personal
function crearTipoPersonal(TipoPersonalNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_personal/crear_tipo_personal.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Tipo personal creado exitosamente');
                window.location.href = "tipo_personal.html";
            } else {
                console.error('Error al crear el tipo personal. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el tipo personal.');
    };

    xhr.send(JSON.stringify(TipoPersonalNuevo));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioTipoPersonal');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const TipoPersonalNuevo = {};

        for (const [key, value] of formData.entries()) {
            TipoPersonalNuevo[key] = value;
        }

        crearTipoPersonal(TipoPersonalNuevo);
    });

    
    // Función para cargar la lista de personal disponible
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