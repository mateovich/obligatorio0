//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto;
var comentarios;
let comentariosObt;
let productoObt;
let listprductoObt;
const prodIds = { "Chevrolet Onix Joy": "5678", "Fiat Way": undefined, "Suzuki Celerio": undefined, "Peugeot 208": undefined };
let productoAñadible = { "name": undefined, "count": 1, "unitCost": undefined, "currency": undefined, "src": undefined }



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

function agregarComent() {
    console.log("fdsa")
    if (comentChek.checkValidity() === true) {
        console.log("fas")
        datetime = new Date();
        let newComent = {
            "score": checkSocre(),
            "description": document.getElementById("coment").value,
            "user": JSON.parse(localStorage.getItem("datos")).usuario,
            "dateTime": `${new Date().getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`
        };
        comentarios.push(newComent);
        mostrar(producto, comentarios);
    } else { console.log() }
};


function checkSocre() {
    var elements = document.getElementsByName("puntuacion");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            return parseInt(elements[i].value);
        }
    }

}

function mostrar(producto, comentarios) {
    let info = "";
    let imgs1 = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">`;
    let imgs2 = "";
    let imgs3 = `</div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>`;
    let comentariosMarcados = "";
    let productosRelacionados = "<br><h3>Productos Relacionados:</h3><hr>";

    info += `<h2>${producto.name}</h2> <button type="button" onclick="añadir()">Añadir al carrito</button><span id="añadirMsg"></span><br>
    <h3>${producto.cost} ${producto.currency}</h3>
    <p>${producto.description}</p>`;

    imgs2 += `<div class="carousel-item active">
    <img src="${producto.images[0]}" class="d-block w-100">
  </div>`
    for (let i = 1; i < producto.images.length; i++) {
        let imagen = producto.images[i];
        imgs2 += `<div class="carousel-item">
      <img src="${imagen}" class="d-block w-100">
    </div>`;
    }

    for (let i = 0; i < comentarios.length; i++) {
        let comentario = comentarios[i];
        let puntaje = comentario.score;
        let restante = 5 - puntaje;
        comentariosMarcados += `<p><strong>` + comentario.user + `</strong> (${comentario.dateTime}) dijo:<br></p>`;
        comentariosMarcados += `<p>` + comentario.description + `</p>`;
        for (let j = 0; j < puntaje; j++) {
            comentariosMarcados += `<span class="fa fa-star checked"></span>`
        }
        for (let k = 0; k < restante; k++) {
            comentariosMarcados += `<span class="fa fa-star" ></span>`
        }
        comentariosMarcados += `<hr>`
    }

    for (let i = 0; i < producto.relatedProducts.length; i++) {
        let recomendado = producto.relatedProducts[i];
        let rutaImagen = lista_productos[recomendado].imgSrc;
        productosRelacionados += `<a onclick="cargarproducto(` + i + `)" href="product-info.html"><img class="img" src="${rutaImagen}"width="188px" height="" alt="${lista_productos[recomendado].name}" ></a>`;
    }






    document.getElementById("contenido").innerHTML = info;
    document.getElementById("imagenes").innerHTML = imgs1 + imgs2 + imgs3;
    document.getElementById("comentarios").innerHTML = comentariosMarcados;
    document.getElementById("prodsrela").innerHTML = productosRelacionados;
    document.getElementById("inexistencia").innerHTML = "";
    if (localStorage.getItem("loguedUser") == "true") {
        document.getElementById("posteador").innerHTML = `
    <form id="comentChek">
    <textarea  name="comentario" required placeholder="Ingrese su comentario aquí" id="coment" cols="30" rows="10"></textarea>
    <br>
    <div class="puntaje_posteador" id="puntaje_posteador">

        <input id="star-5" type="radio" name="puntuacion" value="5" />
        <label for="star-5" title="5 stars">
        <i class="active fa fa-star"></i>
        </label>

        <input id="star-4" type="radio" name="puntuacion" value="4" />
        <label for="star-4" title="4 stars">
        <i class="active fa fa-star"></i>
        </label>

        <input id="star-3" type="radio" name="puntuacion" value="3" />
        <label for="star-3" title="3 stars">
        <i class="active fa fa-star"></i>
        </label>

        <input id="star-2" type="radio" name="puntuacion" value="2" />
        <label for="star-2" title="2 stars">
        <i class="active fa fa-star"></i>
        </label>

        <input id="star-1" type="radio" name="puntuacion" value="1" />
        <label for="star-1" title="1 stars">
        <i class="active fa fa-star"></i>
        </label>

        <input id="star-0" type="radio" name="puntuacion" value="0" required checked />

    </div>
    </form>
    <button type="button" onclick="agregarComent()" id="enviarComent">enviar</button>
    <br>` } else {
        document.getElementById("posteador").innerHTML = '<p> Necesitas haber <a href="javascript: mandarIniciar()">iniciado sesión</a> para poder comentar</p>'
    }



};


function mandarIniciar() {
    localStorage.setItem('login-need', JSON.stringify({
        pag: "product-info.html"
    }));
    window.location = "index.html"

}



function añadir() {
    var productoAAñardir = productoAñadible;
    productoAAñardir["name"] = producto.name;
    productoAAñardir["unitCost"] = producto.cost;
    productoAAñardir["currency"] = producto.currency;
    productoAAñardir["src"] = producto.images[1];
    if (localStorage.getItem("carrito")) {


        let estaProducto = false;
        let carroEstado_length = JSON.parse(localStorage.getItem("carrito")).length;
        for (i = 0; i < carroEstado_length; i++) {
            if (JSON.parse(localStorage.getItem("carrito"))[i].name == producto.name) {
                estaProducto = true
            }
        }
        if (estaProducto) {
            document.getElementById("añadirMsg").innerHTML = "El producto ya está en el carrito"
        } else {


        let carrito = JSON.parse(localStorage.getItem("carrito"))
        carrito.push(productoAñadible);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        document.getElementById("añadirMsg").innerHTML = "El producto fue añadido con éxito"
        }
    } else {
        let lista = [];
        lista.push(productoAAñardir);
        localStorage.setItem("carrito", JSON.stringify(lista));
        document.getElementById("añadirMsg").innerHTML = "El producto fue añadido con éxito"
    }
}

