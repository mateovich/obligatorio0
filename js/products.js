//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var lista_productos = [];

function listar(productos) {
    let cont_productos = "<br><hr><br>";
    for (let i = 0; i< productos.length; i++) {
        let producto = productos[i];

        cont_productos += producto.name + "<br>";
        cont_productos += producto.description + "<br>";
        cont_productos += "$$ " + producto.cost + " " + producto.currency + "      ";
        cont_productos += "vendidos: " + producto.soldCount + "<br><hr><br>";

    }
document.getElementById("bloqueProductos").innerHTML = cont_productos;
};

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(result){
        if (result.status === "ok") {
            lista_productos = result.data;
            listar(lista_productos);
        }
    })
});

