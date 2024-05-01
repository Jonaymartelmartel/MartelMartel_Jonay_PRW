// Función para cargar la lista de usuarios desde el servidor
function CargarUsuarios() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost/ProyectoJonay/API-REST/api-rest/usuario/mostrar_usuario.php';
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        console.log('Estado:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const usuario = JSON.parse(xhr.responseText);
                const usuarioContainer = document.getElementById('Resultados');
                usuarioContainer.innerHTML = '';

                // Construir la tabla
                let tableHTML = `
                    <table class="table">
                        <tr>
                            <th>Nombre</th>
                            <th>Contraseña</th>
                            <th>Acciones</th>
                        </tr>
                `;

                usuario.forEach(function (usuario) {
                    tableHTML += `
                        <tr>
                            <td>${usuario.usuario}</td>
                            <td>${usuario.contrasena}</td>
                            <td>
                                <a href="formularioeditusuario.html?id_usuario=${usuario.id_usuario}" class="btn btn-primary">Editar</a>
                                <button class="btn btn-danger" onclick="borrar_usuario(${usuario.id_usuario})">Eliminar</button>
                            </td>
                        </tr>
                    `;
                });

                tableHTML += '</table>';

                usuarioContainer.innerHTML = tableHTML;
            } else {
                console.error('Error al cargar los usuarios. Estado:', xhr.status);
            }
        }
    };
    xhr.onerror = function () {
        console.error('Error de red al cargar los usuarios.');
    };
    xhr.send();
}

// Agrega un evento de carga para ejecutar la función CargarUsuarios cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
    CargarUsuarios();
});