// Función para enviar una solicitud PUT y actualizar un tipo de personal
function editarTipoPersonal(id_tipo_personal, TipoMedicoActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_personal/actualizar_tipo_personal.php/?id_tipo_personal=${id_tipo_personal}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('tipo personal actualizada exitosamente');
                window.location.href = "tipo_personal.html";
            } else {
                console.error('Error al actualizar el tipo personal. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar el tipo personal.');
    };

    xhr.send(JSON.stringify(TipoMedicoActualizado));
}

// Función para obtener los datos de un tipo de personal específico
function obtenerDatosTipoPersonal(id_tipo_personal) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_personal/mostrar_tipo_personal.php/?id_tipo_personal=${id_tipo_personal}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const tipo_personal = JSON.parse(xhr.responseText);
                llenarFormulario(tipo_personal);
            } else {
                console.error('Error al cargar los datos del tipo personal. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del tipo personal.');
    };

    xhr.send();
}

// Función para llenar el formulario con los datos del tipo de personal
function llenarFormulario(tipo_personal) {
    console.log('Datos recibidos para llenar el formulario:', tipo_personal);
    document.getElementById('id_tipo_personal').value = tipo_personal.id_tipo_personal;
    document.getElementById('tipo_personal').value = tipo_personal.tipo_personal;
    document.getElementById('cod_per').value = tipo_personal.cod_per;
}

// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const editarTipoPersonalBtn = document.getElementById('editarTipoPersonalBtn');
    if (editarTipoPersonalBtn) {
        editarTipoPersonalBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioTipoPersonal'));
            const TipoMedicoActualizado = {};

            for (const [key, value] of formData.entries()) {
                TipoMedicoActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const id_tipo_personal = urlParams.get('id_tipo_personal');

            if (id_tipo_personal) {
                editarTipoPersonal(id_tipo_personal, TipoMedicoActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el tipopersonal.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const id_tipo_personal = urlParams.get('id_tipo_personal');

    if (id_tipo_personal) {
        obtenerDatosTipoPersonal(id_tipo_personal);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del tipopersonal.');
    }
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