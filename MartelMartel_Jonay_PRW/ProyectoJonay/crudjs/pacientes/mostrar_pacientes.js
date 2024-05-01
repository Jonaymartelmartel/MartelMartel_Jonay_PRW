// Función para cargar la lista de pacientes desde el servidor y mostrarla en una tabla
function CargarPacientes() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/pacientes/mostrar_pacientes.php'; 
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const pacientes = JSON.parse(xhr.responseText);
                const pacientesContainer = document.getElementById('Resultados');
                pacientesContainer.innerHTML = '';

                // Construir la tabla
                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Edad</th>
                            <th>Teléfono</th>
                            <th>Código de Hospital</th>
                            <th>Código de Sala de Espera</th>
                            <th>Acciones</th>
                        </tr>
                `;

                pacientes.forEach(function (paciente) {
                    tableHTML += `
                        <tr>
                            <td>${paciente.dni_pac}</td>
                            <td>${paciente.nombre}</td>
                            <td>${paciente.apellidos}</td>
                            <td>${paciente.edad}</td>
                            <td>${paciente.telefono}</td>
                            <td>${paciente.cod_hospital}</td>
                            <td>${paciente.cod_salas_espera}</td>
                            <td>
                                <a href="formularioeditpacientes.html?cod_pac=${paciente.cod_pac}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_pacientes(${paciente.cod_pac})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                pacientesContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los pacientes. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los pacientes.');
    };
    xhr.send();
}

// Event listener que carga la lista de pacientes al cargar el DOM
document.addEventListener("DOMContentLoaded", function () {
    CargarPacientes();
});
