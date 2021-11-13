const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_CPRODUCT = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

var usuariologueado = false;
var hayrotulo = false;
var usuario_estado = "";
var datosUser = {}

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

if (localStorage.getItem("datos")) {
  usuariologueado = true;
  let datosaIngresar_json = localStorage.getItem("datos");
  datosUser = JSON.parse(datosaIngresar_json);
  usuario_estado = datosUser.usuario;

};

function cerrarSesion() {
  localStorage.removeItem('datos');
  localStorage.removeItem('loguedUser');
}

/* Colocador de inicio sesion en el encabezado */
document.addEventListener(`DOMContentLoaded`, function () {
  var rotulo = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between");
  if (rotulo.length > 0) {
    hayrotulo = true
  };

  if (hayrotulo) {
    let usuarioAmeter = rotulo[0];
    if (usuariologueado) {
      usuarioAmeter.innerHTML += `
      <button class="btn btn-secondary dropdown-toggle" type="button" id="desplegableusuario" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">` + usuario_estado + `</button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="cart.html">Mi carrito</a>
        <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
        <a class="dropdown-item" href="index.html" onclick="cerrarSesion()">Cerrar sesión</a>
      </div>` }
    else {
      usuarioAmeter.innerHTML += '<a class="py-2 d-none d-md-inline-block" href="index.html">Iniciar Sesión</a>'
    }
  };


});



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.