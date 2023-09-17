//nombre de usuario//

let nombreUsuario = localStorage.getItem("nombreUsuario");

document.getElementById("nombreCheckout").innerHTML = "¡Bienvenido/a " + nombreUsuario + "!";

const tableBody = document.querySelector("tbody")
const section = document.querySelector("section#containerCarrito")
const btnComprar = document.querySelector("button#btnComprar")

// funciones sobe carrito 👇//

let totalCarrito = 0;

function listarProductosCarritoHTML(producto) {
    const precioConDecimales = parseFloat(producto.precio).toFixed(2);
    totalCarrito += parseFloat(producto.precio);
    return `<span class="carritoCheck"><tr width="70px" height="70px">
                <td><img src="${producto.imagen}" alt="${producto.nombre}" width="65px" height="65px"</td>
                <td>${producto.nombre} </td>
                <td>${producto.marca} </td>
                <td>$ ${precioConDecimales} </td></div>
                <td id="${producto.codigo}" class="botonQuitar" title="Quitar del Carrito">❌</td>
            </tr></span>`;
}

function mostrarMensajeCarritovacio() {
    return `<div class="tarjetaVacia">
                <h2>
                Tu carrito esta vacío!
            </h2>
            <h3>
                🛒
            </h3>
            </div>`

}

function clickQuitarDelCarrito() {
    const botonesQuitar = document.querySelectorAll("td.botonQuitar")
    botonesQuitar.forEach((botoQuitar) => {
        botoQuitar.addEventListener('click', () => {
            let codigo = parseInt(botoQuitar.id)
            let indice = carritoProductos.findIndex((producto) => producto.codigo === codigo)
            carritoProductos.splice(indice, 1)
            armarCarrito()
            guardarCarritoProductos()
        })
    })
}

function armarCarrito() {
    tableBody.innerHTML = '';
    if (carritoProductos.length > 0) {
        carritoProductos.forEach((producto) => {
            tableBody.innerHTML += listarProductosCarritoHTML(producto)
            clickQuitarDelCarrito()
        })
    } else {
        tableBody.innerHTML = mostrarMensajeCarritovacio()
    }
    document.getElementById("totalProductosCarrito").textContent = carritoProductos.length;
    document.getElementById("totalCarrito").textContent = totalCarrito.toFixed(2);
    localStorage.setItem('totalCarrito', totalCarrito.toFixed(2));
}

armarCarrito();

btnComprar.addEventListener('click', () => {
    Swal.fire({
        title: 'Confirma la compra?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'CONFIRMAR',
        denyButtonText: 'CANCELAR',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('carritoProductos')
            carritoProductos.length = 0
            Swal.fire('Gracias por tu compra!', 'No olvides revisar tu e-mail por la factura con el detalle de la compradel producto', 'success')
            tableBody.innerHTML = mostrarMensajeCarritovacio()
        }
    })
})


