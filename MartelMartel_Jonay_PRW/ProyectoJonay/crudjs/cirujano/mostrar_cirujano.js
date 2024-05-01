// Función para cargar la lista de cirujanos desde el servidor y mostrarla en una tabla en la página
function CargarCirujano() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/cirujano/mostrar_cirujano.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const cirujano = JSON.parse(xhr.responseText);
                const CirujanoContainer = document.getElementById('Resultados');
                CirujanoContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Número de colegiado</th>
                            <th>Id tipo medico</th>
                            <th>Acciones</th>
                        </tr>
                `;

                cirujano.forEach(function (cirujano) {
                    tableHTML += `
                        <tr>
                            <td>${cirujano.num_colegiado}</td>
                            <td>${cirujano.id_tipo_medicos}</td>
                            <td>
                                <a href="formularioeditcirujano.html?cod_cirujano=${cirujano.cod_cirujano}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_cirujano(${cirujano.cod_cirujano})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                
                CirujanoContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los cirujanos. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los cirujanos.');
    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function () {
    // Llama a la función para cargar la lista de cirujanos al cargar completamente el DOM
    CargarCirujano();
});