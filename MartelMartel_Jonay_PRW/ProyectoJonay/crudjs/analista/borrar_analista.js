/*Este código define una función borrar_analista(cod_analista) que utiliza la interfaz XMLHttpRequest 
para enviar una solicitud DELETE a una URL específica que incluye el código del analista a eliminar. 
Luego, maneja la respuesta del servidor, mostrando una alerta de éxito si la respuesta es 200 (OK) y 
redirige a una página "analista.html", o muestra un mensaje de error en la consola si hay algún problema 
de red o si la respuesta no es exitosa.*/

function borrar_analista(cod_analista) {
    const url = `http://localhost/ProyectoJonay/API-REST/api-rest/analista/borrar_analista.php/?cod_analista=${cod_analista}`;

    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', url, true);

    xhr.onreadystatechange = function () {
        console.log('Status:', xhr.status); 
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert('Analista eliminado exitosamente');
                window.location.href = "analista.html";
            } else {
                console.error('Error al eliminar el analista. Estado:', xhr.status);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error de red al intentar eliminar el expediente.');
    };
    xhr.send();
}