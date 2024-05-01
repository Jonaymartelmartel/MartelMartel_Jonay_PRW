// Función para editar un director mediante una solicitud PUT al servidor
function editarDirector(cod_director, DirectorActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/director/actualizar_director.php/?cod_director=${cod_director}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('director actualizada exitosamente');
                window.location.href = "director.html";
            } else {
                console.error('Error al actualizar el director. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar la director.');
    };

    xhr.send(JSON.stringify(DirectorActualizado));
}
// Función para obtener los datos de un director mediante una solicitud GET al servidor
function obtenerDatosDirector(cod_director) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/director/mostrar_director.php/?cod_director=${cod_director}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const director = JSON.parse(xhr.responseText);
                llenarFormulario(director);
            } else {
                console.error('Error al cargar los datos del director. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del director.');
    };

    xhr.send();
}

// Función para llenar el formulario de director con los datos obtenidos del servidor
function llenarFormulario(director) {
    document.getElementById('cod_director').value = director.cod_director;
    document.getElementById('id_tipo_personal').value = director.id_tipo_personal;
}

// Event listener que escucha el evento 'DOMContentLoaded' para el formulario del director
document.addEventListener('DOMContentLoaded', function () {
    const editarDirectorBtn = document.getElementById('editarDirectorBtn');
    if (editarDirectorBtn) {
        editarDirectorBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioDirector'));
            const DirectorActualizado = {};

            for (const [key, value] of formData.entries()) {
                DirectorActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_director = urlParams.get('cod_director');

            if (cod_director) {
                editarDirector(cod_director, DirectorActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el director');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_director = urlParams.get('cod_director');

    if (cod_director) {
        obtenerDatosDirector(cod_director);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del director.');
    }
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