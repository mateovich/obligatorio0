const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var usuariologueado = false;
var hayrotulo = false;
var usuario_estado = localStorage.getItem("usuario");

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
      });
    }
    
    if  (localStorage.getItem(`usuario`)) {
      usuariologueado = true;
    };
    
document.addEventListener(`DOMContentLoaded`, function(){
  var rotulo = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between");
  if (rotulo.length > 0) {
    hayrotulo = true};
    
  if (hayrotulo && usuariologueado) {
    
    let usuarioAmeter = document.createElement("a");
    usuarioAmeter.innerHTML += usuario_estado;
    usuarioAmeter.classList.add("py-2", "d-none", "d-md-inline-block");
    usuarioAmeter.setAttribute("href", "my-profile.html");
    rotulo[0].appendChild(usuarioAmeter);
  };
  
  
});



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.