// Función para editar un registro de personal
function editarPersonal(cod_per, personalActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/personal/actualizar_personal.php/?cod_per=${cod_per}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('personal actualizado exitosamente');
                window.location.href = "personal.html";
            } else {
                console.error('Error al actualizar el personal. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar el personal.');
    };

    xhr.send(JSON.stringify(personalActualizado));
}

// Función para obtener los datos de un personal específico
function obtenerDatosPersonal(cod_per) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/personal/mostrar_personal.php/?cod_per=${cod_per}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const personal = JSON.parse(xhr.responseText);
                llenarFormulario(personal);
            } else {
                console.error('Error al cargar los datos del personal. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del personal.');
    };

    xhr.send();
}

// Función para llenar el formulario con los datos del personal
function llenarFormulario(personal) {
    console.log('Datos recibidos para llenar el formulario:', personal);
        document.getElementById('cod_per').value = personal.cod_per;
        document.getElementById('dni_per').value = personal.dni_per;
        document.getElementById('nombre').value = personal.nombre;
        document.getElementById('apellidos').value = personal.apellidos;
        document.getElementById('salario').value = personal.salario;
        document.getElementById('contrato').value = personal.contrato;
        document.getElementById('cod_hospital').value = personal.cod_hospital;
}

// Evento al cargar el documento HTML
document.addEventListener('DOMContentLoaded', function () {
    const editarPersonalBtn = document.getElementById('editarPersonalBtn');
    if (editarPersonalBtn) {
        editarPersonalBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioPersonal'));
            const personalActualizado = {};

            for (const [key, value] of formData.entries()) {
                personalActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const cod_per = urlParams.get('cod_per');

            if (cod_per) {
                editarPersonal(cod_per, personalActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar el personal.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const cod_per = urlParams.get('cod_per');

    if (cod_per) {
        obtenerDatosPersonal(cod_per);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos del personal.');
    }
});

// Función para cargar los hospitales en el formulario
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