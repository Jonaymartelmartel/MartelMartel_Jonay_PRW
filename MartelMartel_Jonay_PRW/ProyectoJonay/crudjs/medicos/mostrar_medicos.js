// Función para cargar la lista de médicos desde el servidor y mostrarla en una tabla
function CargarMedicos() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/medicos/mostrar_medicos.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const medicos = JSON.parse(xhr.responseText);
                const MedicosContainer = document.getElementById('Resultados');
                MedicosContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Nombre</th>
                            <th>Especialidad</th>
                            <th>Id tipo personal</th>
                            <th>Acciones</th>
                        </tr>
                `;

                medicos.forEach(function (medicos) {
                    tableHTML += `
                        <tr>
                            <td>${medicos.nombre}</td>
                            <td>${medicos.especialidad}</td>
                            <td>${medicos.id_tipo_personal}</td>
                            <td>
                                <a href="formularioeditmedicos.html?cod_medicos=${medicos.cod_medicos}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_medicos(${medicos.cod_medicos})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                
                MedicosContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los medicoss. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los medicoss.');
    };
    xhr.send();
}

// Event listener que espera a que el DOM se cargue completamente para cargar la lista de médicos
document.addEventListener("DOMContentLoaded", function () {
    CargarMedicos();
});