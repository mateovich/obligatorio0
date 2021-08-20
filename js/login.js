//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("entrar").addEventListener("click", function () {
        let usuario = document.getElementById("user");
        let contrasenia = document.getElementById("contrasenia");
        let todolisto = false;
        let usuarioIngresado = false;
        let contraseniaIngresada = false;

        if (user.value === "") {
            usuario.classList.add("vacio");
            usuarioIngresado = false;
        } else {
                usuarioIngresado = true;
                usuario.classList.remove("vacio");
            }
        if (contrasenia.value === "") {
            contrasenia.classList.add("vacio");
            contraseniaIngresada = false;
        } else {
            contraseniaIngresada = true;
            contrasenia.classList.remove("vacio");
        }
        if (contraseniaIngresada && usuarioIngresado) {
            todolisto = true;
        } else {
            todolisto = false;
        }
        if (todolisto) {
            alert("bienvenido");
            window.location = "inicio.html";
        } else {
            alert("ingrese todo los datos");
        }
    });
});