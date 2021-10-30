//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var usuariologueado = false;
document.addEventListener("DOMContentLoaded", function (e) {
    let loginNeed = localStorage.getItem('login-need');
    console.log("login-need")
    console.log(loginNeed)
    if (loginNeed) {
        console.log("uu")
        loginNeed = JSON.parse(loginNeed);
        document.getElementById("alerta").innerHTML = '<div class="alert alert-danger" role="alert">¡Debes haber ingresado para acceder!</div>'
    }
    document.getElementById("entrar").addEventListener("click", function () {
        let user = document.getElementById("user").value;
        let contrasenia = document.getElementById("contrasenia").value;
        let todolisto = false;
        let usuarioIngresado = false;
        let contraseniaIngresada = false;


        if (user === "") {
            document.getElementById("user").classList.add("vacio");
            usuarioIngresado = false;
        } else {
            usuarioIngresado = true;
            document.getElementById("user").classList.remove("vacio");
        }
        if (contrasenia === "") {
            document.getElementById("contrasenia").classList.add("vacio");
            contraseniaIngresada = false;
        } else {
            contraseniaIngresada = true;
            document.getElementById("contrasenia").classList.remove("vacio");
        }
        if (contraseniaIngresada && usuarioIngresado) {
            todolisto = true;
        } else {
            todolisto = false;
        }
        if (todolisto) {
            let datosDelUser = {
                usuario: user, passworld: contrasenia
            }
            let datosDelUser_json = JSON.stringify(datosDelUser);
            localStorage.setItem("datos", datosDelUser_json);
            localStorage.setItem("nuevoUser", "true");
            localStorage.setItem("loguedUser", "true")
            usuariologueado = true;
            if (loginNeed) {
                localStorage.removeItem('login-need');
                window.location = loginNeed.pag;
            } else {
                window.location = "inicio.html";
            }
        } else {
            alert("ingrese todo los datos");
        }
    });
});