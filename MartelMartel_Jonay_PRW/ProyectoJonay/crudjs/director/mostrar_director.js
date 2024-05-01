// Función para cargar los directores desde el servidor y mostrarlos en una tabla
function CargarDirector() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/director/mostrar_director.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const director = JSON.parse(xhr.responseText);
                const DirectorContainer = document.getElementById('Resultados');
                DirectorContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Id tipo personal</th>
                            <th>Acciones</th>
                        </tr>
                `;

                director.forEach(function (director) {
                    tableHTML += `
                        <tr>
                            <td>${director.id_tipo_personal}</td>
                            <td>
                                <a href="formularioeditdirector.html?cod_director=${director.cod_director}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_director(${director.cod_director})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                
                DirectorContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los directors. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los directors.');
    };
    xhr.send();
}

// Event listener que escucha el evento 'DOMContentLoaded' para cargar los directores al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    CargarDirector();
});