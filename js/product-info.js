//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var producto;
var comentarios;
let comentariosObt;
let productoObt;
let listprductoObt;
let productoEnCuestion = JSON.parse(localStorage.getItem('producto')).productoId;
console.log(productoEnCuestion);
/*function quelugar(producto) {
    return producto.name === productoEnCuestion;
} */


function cargarproducto(id_producto) {
    localStorage.setItem('producto', JSON.stringify({ productoId: id_producto }));
};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (result) {
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


    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (result) {
        if (result.status === "ok") {
            comentarios = result.data;
            comentariosObt = true;
            mostrar(producto, comentarios);
        }  
    });

/*    if (producto.name == lista_productos[JSON.parse(localStorage.getItem('producto')).productoId].name) {
        productoObt = true;
        alert("cpeo");
    } else {
        alert("cucu"); }
    
    

*/

});

function mostrar(producto, comentarios) {
    let info = "";
    let imgs = "";
    let comentariosMarcados = "";
    let productosRelacionados = "<br><h3>Productos Relacionados:</h3><hr>";

    info += `<h2>${producto.name}</h2><br>
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

};

