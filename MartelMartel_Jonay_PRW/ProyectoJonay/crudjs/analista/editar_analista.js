// Función para editar un analista
// Envia una solicitud PUT para actualizar los datos de un analista en el servidor
function editarAnalista(cod_analista, AnalistaActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/analista/actualizar_analista.php/?cod_analista=${cod_analista}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Analista actualizada exitosamente');
                window.location.href = "analista.html";
            } else {
                console.error('Error al actualizar el analista. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar la analista.');
    };

    xhr.send(JSON.stringify(AnalistaActualizado));
}
// Función para obtener datos de un analista
// Envia una solicitud GET para obtener los datos de un analista del servidor
function obtenerDatosAnalista(cod_analista) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/analista/mostrar_analista.php/?cod_analista=${cod_analista}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const analista = JSON.parse(xhr.responseText);
                llenarFormulario(analista);
            } else {
                console.error('Error al cargar los datos del analista. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del analista.');
    };

    xhr.send();
}

// Función para llenar el formulario con datos del analista
// Rellena el formulario con los datos del analista obtenidos del servidor
function llenarFormulario(analista) {
    document.getElementById('cod_analista').value = analista.cod_analista;
    document.getElementById('num_colegiado').value = analista.num_colegiado;
    document.getElementById('id_tipo_medicos').value = analista.id_tipo_medicos;
}

document.addEventListener('DOMContentLoaded', function () {
    const editarAnalistaBtn = document.getElementById('editarAnalistaBtn');
    if (editarAnalistaBtn) {
        editarAnalistaBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioAnalista'));
            const AnalistaActualizado = {};

            for (const [key, value] of formData.entries()) {
                AnalistaActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_analista = urlParams.get('cod_analista');

            if (cod_analista) {
                editarAnalista(cod_analista, AnalistaActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el analista.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_analista = urlParams.get('cod_analista');

    if (cod_analista) {
        obtenerDatosAnalista(cod_analista);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del analista.');
    }
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