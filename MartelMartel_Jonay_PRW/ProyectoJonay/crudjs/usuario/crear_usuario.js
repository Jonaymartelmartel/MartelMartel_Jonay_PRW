// Función para crear un nuevo usuario
function crearUsuario(UsuarioNuevo) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/usuario/crear_usuario.php`;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status);
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) { 
                alert('Usuario creado exitosamente');
                window.location.href = "usuario.html";
            } else {
                console.error('Error al crear el usuario. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar crear el usuario.');
    };

    xhr.send(JSON.stringify(UsuarioNuevo));
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioUsuario');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const UsuarioNuevo = {};

        for (const [key, value] of formData.entries()) {
            UsuarioNuevo[key] = value;
        }

        crearUsuario(UsuarioNuevo);
    });
});