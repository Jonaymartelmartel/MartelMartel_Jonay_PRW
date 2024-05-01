// Esta función envía una solicitud PUT para actualizar un tipo de médico mediante su ID
function editarTipoMedicos(id_tipo_medicos, TipoMedicoActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_medicos/actualizar_tipo_medicos.php/?id_tipo_medicos=${id_tipo_medicos}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('tipo_medicos actualizada exitosamente');
                window.location.href = "tipo_medicos.html";
            } else {
                console.error('Error al actualizar el tipo_medicos. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar el tipo_medicos.');
    };

    xhr.send(JSON.stringify(TipoMedicoActualizado));
}

// Esta función obtiene los datos del tipo de médico mediante su ID y los carga en el formulario de edición
function obtenerDatosTipoMedicos(id_tipo_medicos) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/tipo_medicos/mostrar_tipo_medicos.php/?id_tipo_medicos=${id_tipo_medicos}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const tipo_medicos = JSON.parse(xhr.responseText);
                llenarFormulario(tipo_medicos);
            } else {
                console.error('Error al cargar los datos del tipo medicos. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del tipo medicos.');
    };

    xhr.send();
}

// Esta función llena el formulario con los datos del tipo de médico
function llenarFormulario(tipo_medicos) {
    console.log('Datos recibidos para llenar el formulario:', tipo_medicos);
    document.getElementById('id_tipo_medicos').value = tipo_medicos.id_tipo_medicos;
    document.getElementById('tipo_medicos').value = tipo_medicos.tipo_medicos;
    document.getElementById('cod_medicos').value = tipo_medicos.cod_medicos;
}

document.addEventListener('DOMContentLoaded', function () {
    const editarTipoMedicosBtn = document.getElementById('editarTipoMedicosBtn');
    if (editarTipoMedicosBtn) {
        editarTipoMedicosBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioTipoMedicos'));
            const TipoMedicoActualizado = {};

            for (const [key, value] of formData.entries()) {
                TipoMedicoActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const id_tipo_medicos = urlParams.get('id_tipo_medicos');

            if (id_tipo_medicos) {
                editarTipoMedicos(id_tipo_medicos, TipoMedicoActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el tipo medicos.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const id_tipo_medicos = urlParams.get('id_tipo_medicos');

    if (id_tipo_medicos) {
        obtenerDatosTipoMedicos(id_tipo_medicos);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del tipo medicos.');
    }
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