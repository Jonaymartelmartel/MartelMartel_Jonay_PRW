// Función para cargar la lista de tipos de personal
function CargarTipoPersonal() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/tipo_personal/mostrar_tipo_personal.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const tipo_personal = JSON.parse(xhr.responseText);
                const TipoPersonalContainer = document.getElementById('Resultados');
                TipoPersonalContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Tipo de Personal</th>
                            <th>Código de Personal</th>
                            <th>Acciones</th>
                        </tr>
                `;

                tipo_personal.forEach(function (tipo_personal) {
                    tableHTML += `
                        <tr>
                            <td>${tipo_personal.tipo_personal}</td>
                            <td>${tipo_personal.cod_per}</td>
                            <td>
                                <a href="formularioedittipo_personal.html?id_tipo_personal=${tipo_personal.id_tipo_personal}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_tipo_personal(${tipo_personal.id_tipo_personal})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                TipoPersonalContainer.innerHTML = tableHTML;
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

// Espera a que el contenido del DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    CargarTipoPersonal();
});