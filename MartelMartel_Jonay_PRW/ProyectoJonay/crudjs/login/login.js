document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#login-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const usuario = document.querySelector('#usuario').value;
        const contrasena = document.querySelector('#contrasena').value;

        if (usuario.trim() === '' || contrasena.trim() === '') {
            alert('Por favor, completa todos los campos');
            return;
        }

        const formData = new FormData();
        formData.append('usuario', usuario);
        formData.append('contrasena', contrasena);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '../../ProyectoJonay/API-REST/includes/auth/login.php');
        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.success) {
                    alert(response.message);
                    window.location.href = response.redirect;
                } else {
                    alert(response.message);
                    document.querySelector('#usuario').value = '';
                    document.querySelector('#contrasena').value = '';
                }
            } else {
                alert('Hubo un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
            }
        };
        xhr.send(formData);
    });
});
