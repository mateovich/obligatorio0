//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto;
var comentarios;
let comentariosObt;
let productoObt;
let listprductoObt;
const prodIds = { "Chevrolet Onix Joy": "5678", "Fiat Way": undefined, "Suzuki Celerio": undefined, "Peugeot 208": undefined };
let productoAñadible = {"name": undefined, "count": 1, "unitCost": undefined, "currency": undefined, "src": undefined}


/*function quelugar(producto) {
    return producto.name === productoEnCuestion;
} */




document.addEventListener("DOMContentLoaded", function (e) {

    let productoEnCuestion = (localStorage.getItem('producto'));
    let iDproductInfo = prodIds[productoEnCuestion]
    if (iDproductInfo) {

        getJSONData(PRODUCT_INFO_URL + iDproductInfo + ".json").then(function (result) {
            if (result.status === "ok") {
                producto = result.data;
            } else { alert("error:" + result.data); }
        });

        getJSONData(PRODUCTS_URL).then(function (result) {
            if (result.status === "ok") {
                lista_productos = result.data;
                listprductoObt = true;
            }
        });


        getJSONData(PRODUCT_INFO_COMMENTS_URL + iDproductInfo + "-comments.json").then(function (result) {
            if (result.status === "ok") {
                comentarios = result.data;
                comentariosObt = true;
                mostrar(producto, comentarios);
            }
        });

    }


});

function mostrar(producto, comentarios) {
    let info = "";
    let imgs = "";
    let comentariosMarcados = "";
    let productosRelacionados = "<br><h3>Productos Relacionados:</h3><hr>";

    info += `<h2>${producto.name}</h2> <button type="button" onclick="añadir()">Añadir al carrito</button><br>
    <h3>${producto.cost} ${producto.currency}</h3>
    <p>${producto.description}</p>`;

    for (let i = 0; i < producto.images.length; i++) {
        let imagen = producto.images[i];
        imgs += `<img class="img" src="${imagen}" width="188px" height="" alt="${producto.name}" >`;
    }

    for (let i = 0; i < comentarios.length; i++) {
        let comentario = comentarios[i];
        let puntaje = comentario.score;
        let restante = 5 - puntaje;
        comentariosMarcados += `<strong>` + comentario.user + `</strong> dice:<br>`;
        comentariosMarcados += `<p>` + comentario.description + `</p><br>`;
        for (let j = 0; j < puntaje; j++) {
            comentariosMarcados += `<span class="fa fa-star checked" id="star${j + 1}"></span>`
        }
        for (let k = 0; k < restante; k++) {
            comentariosMarcados += `<span class="fa fa-star" id="star${puntaje + 1 + k}"></span>`
        }
        comentariosMarcados += `<br><hr>`
    }

    for (let i = 0; i < producto.relatedProducts.length; i++) {
        let recomendado = producto.relatedProducts[i];
        let rutaImagen = lista_productos[recomendado].imgSrc;
        productosRelacionados += `<a onclick="cargarproducto(` + i + `)" href="product-info.html"><img class="img" src="${rutaImagen}"width="188px" height="" alt="${lista_productos[recomendado].name}" ></a>`;
    }






    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs;
    document.getElementById("comentarios").innerHTML = comentariosMarcados;
    document.getElementById("prodsrela").innerHTML = productosRelacionados;
    document.getElementById("inexistencia").innerHTML = "";
    document.getElementById("posteador").innerHTML = `<textarea name="comentario" id="coment" cols="30" rows="10"></textarea>
    <br>
    <div id="puntaje_posteador">
      <span class="fa fa-star" id="star1"></span>
      <span class="fa fa-star" id="star2"></span>
      <span class="fa fa-star" id="star3"></span>
      <span class="fa fa-star" id="star4"></span>
      <span class="fa fa-star" id="star5"></span>
    </div>
    <br>
    <br>
    <button id="enviarComent">enviar</button>
    <br>`

};

function añadir() {
    var productoAAñardir = productoAñadible;
    console.log(productoAAñardir);
    productoAAñardir["name"] = producto.name;
    productoAAñardir["unitCost"] = producto.cost;
    productoAAñardir["currency"] = producto.currency;
    productoAAñardir["src"] = producto.images[1];
    if(localStorage.getItem("carrito")) {
        let carrito = JSON.parse(localStorage.getItem("carrito"))
        carrito.push(productoAñadible);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        localStorage.setItem("carrito", JSON.stringify(productoAAñardir));
    }
}

