//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let form = document.getElementById("form");
var datosaIngresar = {};
const prefijos = { uy: "+598", br: "+55", ar: "+54", py: "+595" };
const abrvPais = { uy: "Uruguay", br: "Brasil", ar: "Argentina", py: "Paraguay"};



document.addEventListener("DOMContentLoaded", function (e) {

    /* verificador de inicio */
    if (!(localStorage.getItem("loguedUser") == "true")) {
        localStorage.setItem('login-need', JSON.stringify({
            pag: "my-profile.html"
        }));
        window.location = "index.html"
    }

    chequearDatos();
    form.addEventListener("submit", function (e) {
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            let datosIngresados = {
                usuario: document.getElementById("usr").value,
                nombre: document.getElementById("name").value,
                apellido: document.getElementById("apel").value,
                edad: document.getElementById("age").value,
                email: document.getElementById("mail").value,
                pais: document.getElementById("pais").value,
                tel: document.getElementById("tel").value
            };
            let datosIngresados_json = JSON.stringify(datosIngresados);
            localStorage.setItem("datos", datosIngresados_json);
            localStorage.setItem("nuevoUser", "false");
        };
    });
});

function chequearDatos() {
    if (localStorage.getItem("datos")) {
        let datosaIngresar_json = localStorage.getItem("datos");
        datosaIngresar = JSON.parse(datosaIngresar_json);
        llenarDatos();
    };
};

function llenarDatos() {
    document.getElementById("usr").value = datosaIngresar.usuario;
    document.getElementById("deUsr").innerHTML = datosaIngresar.usuario;
    if (!(localStorage.getItem("nuevoUser") == "true")) {

        document.getElementById("deNomyApel").innerHTML = datosaIngresar.nombre + " " + datosaIngresar.apellido;
        document.getElementById("deEdad").innerHTML = datosaIngresar.edad + " años";
        document.getElementById("deMail").innerHTML = datosaIngresar.email;
        document.getElementById("dePais").innerHTML = abrvPais[`${datosaIngresar.pais}`];
        document.getElementById("deTel").innerHTML = prefijos[`${datosaIngresar.pais}`] + " " + datosaIngresar.tel;

        document.getElementById("name").value = datosaIngresar.nombre;
        document.getElementById("apel").value = datosaIngresar.apellido;
        document.getElementById("age").value = datosaIngresar.edad;
        document.getElementById("mail").value = datosaIngresar.email;
        document.getElementById("pais").value = datosaIngresar.pais;
        ajustPrefijNum(document.getElementById("pais").value);
        document.getElementById("tel").value = datosaIngresar.tel;
    }
};

function ajustPrefijNum(paise) {
    let prefNum = "";
    prefNum = prefijos[paise];
    document.getElementById("prefijNum").innerHTML = prefNum

}