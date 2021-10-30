//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let orden = "3";
var pricMin = undefined;
var pricMax = undefined;
var busqueda = "";

var lista_productos = [];

function cargarproducto(id_producto) {
    localStorage.setItem('producto', JSON.stringify({ productoId: id_producto }));
};

function sortProductos(array, criterio) {
    let lista_modificada = [];
    if (criterio === "2") {
        lista_modificada = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            });
    } else if (criterio === "1") {
        lista_modificada = array.sort(
            function (a, b) {
                if (a.cost > b.cost) { return -1; }
                if (a.cost < b.cost) { return 1; }
                return 0;
            });
    } else if (criterio === "3") {
        lista_modificada = array.sort(function (a, b) {
            if (a.soldCount < b.soldCount) { return 1; }
            if (a.soldCount > b.soldCount) { return -1; }
            return 0;
        });
    }
    return lista_modificada;
}

function listar(productos) {
    let cont_productos = "";

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        if ((((pricMin == undefined) || (pricMin != undefined && parseInt(producto.cost) >= pricMin))
            && ((pricMax == undefined) || (pricMax != undefined && parseInt(producto.cost) <= pricMax)))
            && (busqueda == undefined || (producto.name.toLowerCase().includes(busqueda)) || (producto.description.toLowerCase().includes(busqueda)))) {
            /* cont_productos += `<div><img src="${producto.imgSrc}" width="150px" height="100px" >`;
            cont_productos += `<a onclick="cargarproducto('`+i+`')" href="product-info.html">`+producto.name+`</a>` + "<br>";
            cont_productos += producto.description + "<br>";
            cont_productos += "$$ " + producto.cost + " " + producto.currency + "  ";
            cont_productos += "vendidos: " + producto.soldCount + "</div>"; */
            cont_productos +=
                                    `<div class="col-md-6 col-12"
                                            <div class="card shadow-sm mb-6">
                                                <img class="bd-placeholder-img card-img-top" src="${producto.imgSrc}">
                                                    <div class="card-body">
                                                    <h5 class="card-title row">
                                                    <div class="col-6"><a id="link_${i}" onclick="caragarproducto(${i})" href="product-info.html"><p>${producto.name}</p></a></div><div class="col-6">${producto.cost} ${producto.currency}</div></h5>
                                                    
                                                        <div class="card-text">
                                                            <div class="row"><p>${producto.description}</p></div>
                                                            <div class="row"><p>vendidos: ${producto.soldCount}</p></div>
                                                        </div>
                                                    
                                                    </div>
                                            </div>
                                    </div>`

        }

    }
    document.getElementById("bloqueProductos").innerHTML = cont_productos;
};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (result) {
        if (result.status === "ok") {
            lista_productos = result.data;
            lista_productos = sortProductos(lista_productos, orden);
            listar(lista_productos);
        }

    });
});

document.getElementById("ordenarPor").addEventListener("click", function () {
    orden = document.getElementById("ordenarPor").value
    lista_productos = sortProductos(lista_productos, orden);
    listar(lista_productos);
})

document.getElementById("rangeFilterPric").addEventListener("click", function () {
    pricMax = document.getElementById("rangeFilterPricMax").value;
    pricMin = document.getElementById("rangeFilterPricMin").value;
    if ((pricMin != undefined) && (pricMin != "") && (parseInt(pricMin)) >= 0) {
        pricMin = parseInt(pricMin);
    } else {
        pricMin = undefined;
    }

    if ((pricMax != undefined) && (pricMax != "") && (parseInt(pricMax)) >= 0) {
        pricMax = parseInt(pricMax);
    } else {
        pricMax = undefined;
    }

    listar(lista_productos);
});

document.getElementById("clearRangeFilterPric").addEventListener("click", function () {
    document.getElementById("rangeFilterPricMax").value = "";
    document.getElementById("rangeFilterPricMin").value = "";
    pricMin = undefined;
    pricMax = undefined;
    listar(lista_productos);
})

document.getElementById("buscarProd").addEventListener("input", function () {
    busqueda = document.getElementById("buscarProd").value.toLowerCase();
    listar(lista_productos);
})