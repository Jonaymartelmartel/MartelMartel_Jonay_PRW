// Función para crear una nueva sala de espera
function crearSala(SalaNueva) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/salas_espera/crear_salas_espera.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Sala creada exitosamente');
                window.location.href = "salas_espera.html";
            } else {
                console.error('Error al crear la sala. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear la sala.');
    };

    xhr.send(JSON.stringify(SalaNueva));
}

// Función que se ejecuta cuando el contenido del documento HTML ha sido completamente cargado y analizado
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioSala');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const SalaNueva = {};

        for (const [key, value] of formData.entries()) {
            SalaNueva[key] = value;
        }

        crearSala(SalaNueva);
    });

    function cargarHospitales() {
        const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/hospital/mostrar_hospital.php';
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los hospitales.');
                }
                return response.json();
            })
            .then(data => {
                const selectHospital = document.getElementById('cod_hospital');
                data.forEach(hospital => {
                    const option = document.createElement('option');
                    option.value = hospital.cod_hospital;
                    option.textContent = `${hospital.cod_hospital} - ${hospital.nombre}`;
                    selectHospital.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    cargarHospitales();
});