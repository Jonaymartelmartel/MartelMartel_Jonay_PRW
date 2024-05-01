// Función para crear un nuevo registro de personal
function crearPersonal(PersonaNueva) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/personal/crear_personal.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Persona creada exitosamente');
                window.location.href = "personal.html";
            } else {
                console.error('Error al crear la persona. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear la persona.');
    };

    xhr.send(JSON.stringify(PersonaNueva));
}

// Evento al cargar el documento HTML
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioPersonal');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const PersonaNueva = {};

        for (const [key, value] of formData.entries()) {
            PersonaNueva[key] = value;
        }

        crearPersonal(PersonaNueva);
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

});