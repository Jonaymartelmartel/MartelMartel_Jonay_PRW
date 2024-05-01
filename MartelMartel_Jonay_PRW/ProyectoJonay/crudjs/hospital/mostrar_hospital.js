// Función para cargar la lista de hospitales desde el servidor y mostrarlos en una tabla en la página web
function CargarHospitales() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/hospital/mostrar_hospital.php'; 
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const hospitales = JSON.parse(xhr.responseText);
                const hospitalesContainer = document.getElementById('Resultados');
                hospitalesContainer.innerHTML = '';

                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>CIF</th>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Localidad</th>
                            <th>Teléfono</th>
                        </tr>
                `;

                hospitales.forEach(function (hospital) {
                    tableHTML += `
                        <tr>
                            <td>${hospital.cif_hospital}</td>
                            <td>${hospital.nombre}</td>
                            <td>${hospital.direccion}</td>
                            <td>${hospital.localidad}</td>
                            <td>${hospital.telefono}</td>
                            <td>
                                <a href="formularioedithospital.html?cod_hospital=${hospital.cod_hospital}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_hospital(${hospital.cod_hospital})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                hospitalesContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los hospitales. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los hospitales.');
    };
    xhr.send();
}

// Event listener que espera a que el DOM se cargue completamente para llamar a la función CargarHospitales
document.addEventListener("DOMContentLoaded", function () {
    CargarHospitales();
});