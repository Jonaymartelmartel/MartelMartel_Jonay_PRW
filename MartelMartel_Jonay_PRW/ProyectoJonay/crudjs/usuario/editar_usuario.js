// Función para editar un usuario existente
function editarUsuario(id_usuario, UsuarioActualizado) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/usuario/actualizar_usuario.php/?id_usuario=${id_usuario}`;
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Usuario actualizada exitosamente');
                window.location.href = "usuario.html";
            } else {
                console.error('Error al actualizar la sala. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar actualizar la sala.');
    };

    xhr.send(JSON.stringify(UsuarioActualizado));
}

// Función para obtener los datos de un usuario específico
function obtenerDatosUsuario(id_usuario) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/usuario/mostrar_usuario.php/?id_usuario=${id_usuario}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const usuario = JSON.parse(xhr.responseText);
                llenarFormulario(usuario);
            } else {
                console.error('Error al cargar los datos del usuario. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar cargar los datos del usuario.');
    };

    xhr.send();
}

// Función para llenar el formulario con los datos de un usuario
function llenarFormulario(usuario) {
    document.getElementById('id_usuario').value = usuario.id_usuario;
    document.getElementById('usuario').value = usuario.usuario;
    document.getElementById('contrasena').value = usuario.contrasena;
}

document.addEventListener('DOMContentLoaded', function () {
    const editarUsuarioBtn = document.getElementById('editarUsuarioBtn');
    if (editarUsuarioBtn) {
        editarUsuarioBtn.addEventListener('click', function () {
            const formData = new FormData(document.getElementById('formularioUsuario'));
            const UsuarioActualizado = {};

            for (const [key, value] of formData.entries()) {
                UsuarioActualizado[key] = value;
            }

            const urlParams = new URLSearchParams(window.location.search);
            const id_usuario = urlParams.get('id_usuario');

            if (id_usuario) {
                editarSala(id_usuario, UsuarioActualizado);
            } else {
                console.error('No se proporcionó un ID válido para editar la sala.');
            }
        });
    }
    const urlParams = new URLSearchParams(window.location.search);
    const id_usuario = urlParams.get('id_usuario');

    if (id_usuario) {
        obtenerDatosUsuario(id_usuario);
    } else {
        console.error('No se proporcionó un ID válido para cargar los datos de la sala.');
    }
});