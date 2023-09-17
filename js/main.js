// Array Productos //

const arrayProductos = []

//Funciones sobre Array Productos//

function guardarCarritoProductos() {
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
}

function recuperarCarrito() {
    JSON.parse(localStorage.getItem('carritoProductos'))
    if (localStorage.getItem('carritoProductos') !== null) {
        return JSON.parse(localStorage.getItem('carritoProductos'))
    } else {
        return []
    }
}
const carritoProductos = recuperarCarrito()


const totalProductosCarrito = document.querySelector('.totalProductosCarrito #totalProductosCarrito');

function guardarCarritoProductos() {
    localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
}


function CarritoCheckout() {
    const totalProductosCarrito = document.querySelector('.totalProductosCarrito #totalProductosCarrito');
    if (totalProductosCarrito) {
        totalProductosCarrito.textContent = carritoProductos.length;
    }
}

carritoProductos.length > 0 && CarritoCheckout();