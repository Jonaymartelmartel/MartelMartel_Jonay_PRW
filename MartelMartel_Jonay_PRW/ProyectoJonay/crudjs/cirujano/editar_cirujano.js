// Función para editar un cirujano existente
// Envia una solicitud PUT al servidor con los datos actualizados del cirujano y redirige a la página de cirujanos
function editarCirujano(cod_cirujano, CirujanoActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/cirujano/actualizar_cirujano.php/?cod_cirujano=${cod_cirujano}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('cirujano actualizada exitosamente');
                window.location.href = "cirujano.html";
            } else {
                console.error('Error al actualizar el cirujano. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar la cirujano.');
    };

    xhr.send(JSON.stringify(CirujanoActualizado));
}
// Función para obtener los datos de un cirujano y llenar el formulario de edición
function obtenerDatosCirujano(cod_cirujano) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/cirujano/mostrar_cirujano.php/?cod_cirujano=${cod_cirujano}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const cirujano = JSON.parse(xhr.responseText);
                llenarFormulario(cirujano);
            } else {
                console.error('Error al cargar los datos del cirujano. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del cirujano.');
    };

    xhr.send();
}
// Función para llenar el formulario de edición con los datos del cirujano
function llenarFormulario(cirujano) {
    document.getElementById('cod_cirujano').value = cirujano.cod_cirujano;
    document.getElementById('num_colegiado').value = cirujano.num_colegiado;
    document.getElementById('id_tipo_medicos').value = cirujano.id_tipo_medicos;
}

document.addEventListener('DOMContentLoaded', function () {
    const editarCirujanoBtn = document.getElementById('editarCirujanoBtn');
    if (editarCirujanoBtn) {
        editarCirujanoBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioCirujano'));
            const CirujanoActualizado = {};

            for (const [key, value] of formData.entries()) {
                CirujanoActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_cirujano = urlParams.get('cod_cirujano');

            if (cod_cirujano) {
                editarCirujano(cod_cirujano, CirujanoActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el cirujano.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_cirujano = urlParams.get('cod_cirujano');

    if (cod_cirujano) {
        obtenerDatosCirujano(cod_cirujano);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del cirujano.');
    }
});
// Carga los tipos de médicos en un select del formulario de cirujano
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