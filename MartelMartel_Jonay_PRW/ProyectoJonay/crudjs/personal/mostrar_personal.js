// Función para cargar el personal desde la API
function CargarPersonal() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/personal/mostrar_personal.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const personal = JSON.parse(xhr.responseText);
                const personalContainer = document.getElementById('Resultados');
                personalContainer.innerHTML = '';

                // Construir la tabla
                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Salario</th>
                            <th>Contrato</th>
                            <th>Código de Hospital</th>
                            <th>Acciones</th>
                        </tr>
                `;

                personal.forEach(function (persona) {
                    tableHTML += `
                        <tr>
                            <td>${persona.dni_per}</td>
                            <td>${persona.nombre}</td>
                            <td>${persona.apellidos}</td>
                            <td>${persona.salario}</td>
                            <td>${persona.contrato}</td>
                            <td>${persona.cod_hospital}</td>
                            <td>
                                <a href="formularioeditpersonal.html?cod_per=${persona.cod_per}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_personal(${persona.cod_per})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                personalContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar el personal. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar el personal.');
    };
    xhr.send();
}

// Evento que se ejecuta cuando el documento HTML ha sido completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    CargarPersonal();
});
