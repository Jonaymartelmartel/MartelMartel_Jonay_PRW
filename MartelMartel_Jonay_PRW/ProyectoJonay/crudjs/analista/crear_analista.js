/*La primera función envía una solicitud POST a una URL específica para crear 
un nuevo analista utilizando los datos proporcionados en el objeto AnalistaNuevo. 
Luego, maneja la respuesta del servidor, mostrando una alerta de éxito si la respuesta 
es 200 (OK) y redirige a una página "analista.html", o muestra un mensaje de error en la 
consola si hay algún problema de red o si la respuesta no es exitosa.*/
function crearAnalista(AnalistaNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/analista/crear_analista.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Analista creado exitosamente');
                window.location.href = "analista.html";
            } else {
                console.error('Error al crear el analista. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el analista.');
    };

    xhr.send(JSON.stringify(AnalistaNuevo));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioAnalista');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const AnalistaNuevo = {};

        for (const [key, value] of formData.entries()) {
            AnalistaNuevo[key] = value;
        }

        crearAnalista(AnalistaNuevo);
    });

    /*Esta segunda función carga los tipos de médicos disponibles desde una URL 
    específica utilizando una solicitud GET. Luego, maneja la respuesta del servidor, 
    creando opciones de selección para cada tipo de médico y agregándolas a un elemento <select> 
    en el formulario HTML. Si hay algún error en la carga de los tipos de médicos, se muestra un 
    mensaje de error en la consola.*/
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

});
