// Función para editar una sala de espera
function editarSala(cod_salas_espera, salaActualizada) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/salas_espera/actualizar_salas_espera.php/?cod_salas_espera=${cod_salas_espera}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Sala actualizada exitosamente');
                window.location.href = "salas_espera.html";
            } else {
                console.error('Error al actualizar la sala. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar la sala.');
    };

    xhr.send(JSON.stringify(salaActualizada));
}

// Función para obtener los datos de una sala de espera
function obtenerDatosSala(cod_salas_espera) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/salas_espera/mostrar_salas_espera.php/?cod_salas_espera=${cod_salas_espera}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const salas_espera = JSON.parse(xhr.responseText);
                llenarFormulario(salas_espera);
            } else {
                console.error('Error al cargar los datos de la sala. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos de la sala.');
    };

    xhr.send();
}

// Función para llenar el formulario con los datos de una sala de espera
function llenarFormulario(salas_espera) {
    console.log('Datos recibidos para llenar el formulario:', salas_espera);
    document.getElementById('cod_salas_espera').value = salas_espera.cod_salas_espera;
    document.getElementById('num_sillas').value = salas_espera.num_sillas;
    document.getElementById('cod_hospital').value = salas_espera.cod_hospital;
}

// Event listener para cargar los datos de la sala de espera al cargar el contenido del documento
document.addEventListener('DOMContentLoaded', function () {
    const editarSalaBtn = document.getElementById('editarSalaBtn');
    if (editarSalaBtn) {
        editarSalaBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioSala'));
            const salaActualizada = {};

            for (const [key, value] of formData.entries()) {
                salaActualizada[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_salas_espera = urlParams.get('cod_salas_espera');

            if (cod_salas_espera) {
                editarSala(cod_salas_espera, salaActualizada);
            } else {
                console.error('No se proporcionó un ID válido para editar la sala.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_salas_espera = urlParams.get('cod_salas_espera');

    if (cod_salas_espera) {
        obtenerDatosSala(cod_salas_espera);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos de la sala.');
    }
});

    // Función para cargar los hospitales disponibles
    function cargarHospitales() {
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/hospital/mostrar_hospital.php';
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const selectHospital = document.getElementById('cod_hospital');
                data.forEach(hospital => {
                    const option = document.createElement('option');
                    option.value = hospital.cod_hospital;
                    option.textContent = `${hospital.cod_hospital} - ${hospital.nombre}`;
                    selectHospital.appendChild(option);
                });
            } else {
                throw new Error('Error al cargar los hospitales.');
            }
        };
        xhr.onerror = function() {
            throw new Error('Error de red al cargar los hospitales.');
        };
        xhr.send();
    } catch (error) {
        console.error('Error:', error);
    }
}

cargarHospitales();