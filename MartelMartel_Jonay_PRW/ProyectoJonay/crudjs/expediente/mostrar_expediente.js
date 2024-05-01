// Función para cargar todos los expedientes desde el servidor y mostrarlos en una tabla
function CargarExpedientes() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/expediente/mostrar_expediente.php'; 
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const expedientes = JSON.parse(xhr.responseText);
                const expedientesContainer = document.getElementById('Resultados');
                expedientesContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Vacunas</th>
                            <th>Historial Médico</th>
                            <th>Enfermedades</th>
                            <th>Código de Paciente</th>
                            <th>Acciones</th>
                        </tr>
                `;

                expedientes.forEach(function (expediente) {
                    tableHTML += `
                        <tr>
                            <td>${expediente.vacunas}</td>
                            <td>${expediente.historial_medico}</td>
                            <td>${expediente.enfermedades}</td>
                            <td>${expediente.cod_pac}</td>
                            <td>
                                <a href="formularioeditexpediente.html?cod_expediente=${expediente.cod_expediente}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_expediente(${expediente.cod_expediente})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                expedientesContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los expedientes. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los expedientes.');
    };
    xhr.send();
}

// Event listener que espera a que el DOM se cargue completamente para llamar a la función CargarExpedientes
document.addEventListener("DOMContentLoaded", function () {
    CargarExpedientes();
});
