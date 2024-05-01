// Función para cargar los analistas desde el servidor y mostrarlos en una tabla
// Envia una solicitud GET para obtener los datos de los analistas y los muestra en una tabla HTML
function CargarAnalista() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/analista/mostrar_analista.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const analista = JSON.parse(xhr.responseText);
                const AnalistaContainer = document.getElementById('Resultados');
                AnalistaContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Número de colegiado</th>
                            <th>Id tipo medico</th>
                            <th>Acciones</th>
                        </tr>
                `;

                analista.forEach(function (analista) {
                    tableHTML += `
                        <tr>
                            <td>${analista.num_colegiado}</td>
                            <td>${analista.id_tipo_medicos}</td>
                            <td>
                                <a href="formularioeditanalista.html?cod_analista=${analista.cod_analista}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_analista(${analista.cod_analista})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                
                AnalistaContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los analistas. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los analistas.');
    };
    xhr.send();
}
// Cargar los analistas al cargar la página html
document.addEventListener("DOMContentLoaded", function () {
    CargarAnalista();
});