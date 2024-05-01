// Esta función carga la lista de tipos de médicos
function CargarTipoMedicos() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/tipo_medicos/mostrar_tipo_medicos.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const tipo_medicos = JSON.parse(xhr.responseText);
                const TipoMedicosContainer = document.getElementById('Resultados');
                TipoMedicosContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Tipo de médico</th>
                            <th>Código de Médico</th>
                            <th>Acciones</th>
                        </tr>
                `;

                tipo_medicos.forEach(function (tipo_medicos) {
                    tableHTML += `
                        <tr>
                            <td>${tipo_medicos.tipo_medicos}</td>
                            <td>${tipo_medicos.cod_medicos}</td>
                            <td>
                                <a href="formularioedittipo_medicos.html?id_tipo_medicos=${tipo_medicos.id_tipo_medicos}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_tipo_medicos(${tipo_medicos.id_tipo_medicos})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                TipoMedicosContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar las salas de espera. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar las salas de espera.');
    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
    CargarTipoMedicos();
});