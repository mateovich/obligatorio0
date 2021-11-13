//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var tasa_envio = 0.15;
const plazos = { 0.15: "2 a 5 días", 0.07: "5 a 8 días", 0.05: "12 a 15 días" };


function PrecSubtotal() {
    let listaPrecios = document.getElementsByClassName("precxcant");
    let subTotal = 0;
    for (let i = 0; i < listaPrecios.length; i++) {
        let productoAsumar = 0
        if (listaPrecios[i].classList[1] === "UYU") {
            productoAsumar = parseInt(listaPrecios[i].innerHTML) / 40;
        } else {
            productoAsumar = parseInt(listaPrecios[i].innerHTML);
        }
        subTotal += productoAsumar;
    }
    document.getElementById("subtotal").innerHTML = subTotal
    Prectotal();
};

function opcion_env(tasa) {
    tasa_envio = tasa
    Prectotal()
}

function Prectotal() {
    let subtotal = document.getElementById("subtotal").innerHTML;
    let costoEnv = (parseInt(subtotal) * tasa_envio);
    let total = parseInt(subtotal) + (parseInt(subtotal) * tasa_envio);
    document.getElementById("costEnv").innerHTML = costoEnv;
    document.getElementById("total").innerHTML = total;
    document.getElementById("todalconf").innerHTML = total;
};

function PrecxCant(precio, indice, moneda) {
    let objeto = productos_en_carro[indice];
    objeto.count = parseInt(document.getElementById(`count_${indice}`).value);
    localStorage.setItem("carrito", JSON.stringify(productos_en_carro));
    document.getElementById(`cantenconf_${indice}`).innerHTML = document.getElementById(`count_${indice}`).value
    let cantidad = document.getElementById(`count_${indice}`).value;
    let precioxcant = (precio * cantidad);
    precioxcant += " " + moneda;
    document.getElementById(`precxcant_${indice}`).innerHTML = precioxcant;
    document.getElementById(`cantenconf_${indice}`).innerHTML = cantidad;
    PrecSubtotal();
};

function contar(array) {
    let lista_en_carro = "<br><hr><br>";
    let a_confirmar = "<br>";
    if (array.length == 0) {
        if (localStorage.getItem("elementoComprado")) {
            lista_en_carro = `<h3>¡La compra está en camino! Mientras tanto puedes visitar <a href="products.html">más productos</a>.</h3>`
        } else {
            lista_en_carro = `<h3>Este carrito esta vacío, puedes cargarlo visitando <a href="products.html">los productos</a>.</h3>`
        }
        document.getElementById("btncomprar").setAttribute("disabled", "true");
        document.getElementById("btnComprarMod").setAttribute("disabled", "true");
    } else {
        for (let i = 0; i < array.length; i++) {
            let producto_en_carro = array[i];
            lista_en_carro += `<img src="${producto_en_carro.src}" style="margin-right: 15px;" height="50">`;
            lista_en_carro += "<strong>" + producto_en_carro.name + ":</strong>" + " ";
            lista_en_carro += producto_en_carro.unitCost + " " + producto_en_carro.currency + "/Unidad  ";
            lista_en_carro += "  cantidad: " + `<input type="number" min="1" size="4" onchange="PrecxCant(${producto_en_carro.unitCost}, ${i}, '${producto_en_carro.currency}')" id="count_` + i + '" value="' + producto_en_carro.count + '">';
            lista_en_carro += "= " + `<a id="precxcant_${i}" class="precxcant ${producto_en_carro.currency}"> ${producto_en_carro.unitCost * producto_en_carro.count} ${producto_en_carro.currency}</a>`;
            lista_en_carro += `<button type="button" onclick="eliminarDelCarro(${i})" >&times;</button>`;
            lista_en_carro += "<br><hr><br>";
            a_confirmar += "<p><strong><span>" + producto_en_carro.name + "</strong> x " + `<span id="cantenconf_${i}">` + producto_en_carro.count + "</span>" + "</span>" + "</p><br>";
        }
        document.getElementById("btncomprar").removeAttribute("disabled");
        document.getElementById("btnComprarMod").removeAttribute("disabled");
    }
    document.getElementById("listado_carro").innerHTML = lista_en_carro;
    document.getElementById("listprdconf").innerHTML = a_confirmar;
    PrecSubtotal();
}

// Eliminador de producto del carro

function eliminarDelCarro(indice) {
    productos_en_carro.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(productos_en_carro));
    contar(productos_en_carro);

};
//

// selector de formas de pago diferido
function formaPago(inp) {
    if (inp == "delmodal") {
        inp = document.getElementById("selectorFormPagMod").selectedOptions[0].classList[1];
        document.getElementById(`${inp}`).checked = true;
        ocultador(inp)
    } else {
        document.getElementById(`mod_${inp}`).selected = true;
        ocultador(inp)
    }
}
// -----

// ocultador
function ocultador(forma) {
    document.getElementById("opciones_TC_modal").style.display = "none";
    document.getElementById("opciones_TB_modal").style.display = "none";
    document.getElementById("opciones_BTC_modal").style.display = "none";
    document.getElementById(`opciones_${forma}_modal`).style.display = "inline";

    let inputs = document.getElementsByClassName("input_modal");
    let inputsValids = document.getElementsByClassName(`input_${forma}`);
    for (i = 0; i < inputs.length; i++) {
        let input_acambiar = inputs[i];
        input_acambiar.required = false;
        input_acambiar.disabled = true;
        input_acambiar.classList.remove("input_mod")
    }
    for (i = 0; i < inputsValids.length; i++) {
        let input_acambiar = inputsValids[i];
        input_acambiar.disabled = false;
        input_acambiar.required = true;
        input_acambiar.classList.add("input_mod")
    }
}
//


// -----Verificador de Compra----
function verificadorCompra() {
    if (document.getElementById("mod_BTC").selected) {
        document.getElementById("selectorFormPagMod").setCustomValidity("No operamos con Bitcoins por el momento");
    } else {
        document.getElementById("selectorFormPagMod").setCustomValidity("");
    }
    if ((formCompra.checkValidity() === true)) {
        closeModal(modal1);
        let campos = document.getElementsByClassName("input_pag");
        console.log(tasa_envio)
        let camposdeEnvio = `${campos[1].value}, ${campos[2].value} ${campos[3].value}<br> en un plazo de ${plazos[tasa_envio]}`;
        document.getElementById("datosconf").innerHTML = camposdeEnvio;
        openModal(modal2);
    } else {
        let inputsPag = document.getElementsByClassName("input_pag");
        let inputsMod = document.getElementsByClassName("input_mod");
        let verifValPag = true;
        let verifValMod = true;
        for (let i = 0; i < inputsPag.length; i++) {
            inputActPag = inputsPag[i];
            if (inputActPag.checkValidity() === false) {
                verifValPag = false;
            }
        }
        for (let i = 0; i < inputsMod.length; i++) {
            inputActMod = inputsMod[i];
            if (inputActMod.checkValidity() === false) {
                verifValMod = false;
            }
        }

        if (modal1.style.display == "block") {
            if (verifValMod) {
                closeModal(modal1);
                for (i = 0; i < inputsPag.length; i++) {
                    let campo = inputsPag[i];
                    campo.reportValidity();
                }
            } else {
                for (i = 0; i < inputsMod.length; i++) {
                    let campo = inputsMod[i];
                    campo.reportValidity();
                }
            }
        } else {
            if (verifValPag) {
                openModal(modal1);
                for (i = 0; i < inputsMod.length; i++) {
                    let campo = inputsMod[i];
                    campo.reportValidity();
                }
            } else {
                for (i = 0; i < inputsPag.length; i++) {
                    let campo = inputsPag[i];
                    campo.reportValidity();
                }
            }
        }
    }
}

// confirmador de compra //
function confirmCompra() {
    formCompra.submit();
    productos_en_carro.splice(0, productos_en_carro.length);
    localStorage.setItem("carrito", JSON.stringify(productos_en_carro));
    localStorage.setItem("elementoComprado", "true");
}

// el modal
var modal1 = document.getElementById("selectorPagoModal");
var modal2 = document.getElementById("confirmacionModal");
function openModal(index) {
    index.style.display = "block";
}
function closeModal(index) {
    index.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}
// -----

document.addEventListener("DOMContentLoaded", function (e) {

    /* verificador de inicio */
    if (!(localStorage.getItem("loguedUser") == "true")) {
        localStorage.setItem('login-need', JSON.stringify({
            pag: "cart.html"
        }));
        window.location = "index.html"
    }
    /*-------*/

    if (localStorage.getItem("carrito")) {
        let productos_en_carro_json = localStorage.getItem("carrito")
        productos_en_carro = JSON.parse(productos_en_carro_json)
        contar(productos_en_carro);
    } else {
        getJSONData(CART_CPRODUCT).then(function (result) {
            if (result.status === "ok") {
                productos_en_carro = result.data.articles;
                localStorage.setItem("carrito", JSON.stringify(productos_en_carro));
                contar(productos_en_carro);
            }
        });
    }


    /* auto-selector de país en función del localstorage */
    if (localStorage.getItem("loguedUser") == "true" && localStorage.getItem("nuevoUser") == "false") {
        document.getElementById("selectorPais").value = JSON.parse(localStorage.getItem("datos")).pais
    }
    /* ------ */




});
