// Función para cargar las salas de espera
function CargarSalasEspera() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/salas_espera/mostrar_salas_espera.php';

    // Abre la conexión antes de enviar la solicitud
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const salas_espera = JSON.parse(xhr.responseText);
                const salasContainer = document.getElementById('Resultados');
                salasContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Número de sillas</th>
                            <th>Código de Hospital</th>
                            <th>Acciones</th>
                        </tr>
                `;

                salas_espera.forEach(function (sala) {
                    tableHTML += `
                        <tr>
                            <td>${sala.num_sillas}</td>
                            <td>${sala.cod_hospital}</td>
                            <td>
                                <a href="formularioeditsalasespera.html?cod_salas_espera=${sala.cod_salas_espera}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_salas(${sala.cod_salas_espera})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                salasContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar las salas de espera. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar las salas de espera.');
    };

    // Envía la solicitud después de abrir la conexión
    xhr.send();
}

// Event listener para cargar las salas de espera al cargar el contenido del documento
document.addEventListener("DOMContentLoaded", function () {
    CargarSalasEspera();
});
