//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productos_en_carro = [];
var tasa_envio = 0.15;


function PrecSubtotal() {
    let listaPrecios = document.getElementsByClassName("precxcant");


    let subTotal = 0;
    for (let i = 0; i < listaPrecios.length; i++) {
        let productoAsumar = 0
        if (listaPrecios[i].classList[1] === "USD") {
            productoAsumar = parseInt(listaPrecios[i].innerHTML) * 40;
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
    let subtotal = document.getElementById("subtotal").innerHTML
    let total = parseInt(subtotal) + (parseInt(subtotal) * tasa_envio)
    document.getElementById("total").innerHTML = total
};


function PrecxCant(precio, indice, moneda) {
    let cantidad = document.getElementById(`count_${indice}`).value;
    let precioxcant = (precio * cantidad);
    precioxcant += " " + moneda;
    document.getElementById(`precxcant_${indice}`).innerHTML = precioxcant;
    PrecSubtotal();
};

function contar(array) {
    let lista_en_carro = "<br><hr><br>";

    for (let i = 0; i < array.articles.length; i++) {
        let producto_en_carro = array.articles[i];
        lista_en_carro += `<img src="${producto_en_carro.src}" style="margin-right: 15px;" height="50">`
        lista_en_carro += "<strong>" + producto_en_carro.name + ":</strong>" + " ";
        lista_en_carro += producto_en_carro.unitCost + " " + producto_en_carro.currency + "/Unidad  ";
        lista_en_carro += "  cantidad: " + `<input type="number" min="0" size="4" onchange="PrecxCant(${producto_en_carro.unitCost}, ${i}, '${producto_en_carro.currency}')" id="count_` + i + '" value="' + producto_en_carro.count + '">'
        lista_en_carro += "= " + `<a id="precxcant_${i}" class="precxcant ${producto_en_carro.currency}"> ${producto_en_carro.unitCost * producto_en_carro.count} ${producto_en_carro.currency}</a>`
        lista_en_carro += "<br><hr><br>";
    }
    document.getElementById("listado_carro").innerHTML = lista_en_carro;
    PrecSubtotal();
}

document.addEventListener("DOMContentLoaded", function (e) {

    /* verificador de inicio */
    if (!(localStorage.getItem("loguedUser") == "true")) {
        localStorage.setItem('login-need', JSON.stringify({
            pag: "my-profile.html"
        }));
        window.location = "cart.html"
    }

    getJSONData(CART_CPRODUCT).then(function (result) {
        if (result.status === "ok") {
            productos_en_carro = result.data;
            contar(productos_en_carro);
        }
    })
});
