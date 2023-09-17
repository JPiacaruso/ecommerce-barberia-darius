document.addEventListener('DOMContentLoaded', () => {
  let carritoProductos = recuperarCarrito(); // Cambio de const a let
  CarritoCheckout();
});

// MENSAJE DE BIENVENIDA //

let nombreUsuario = localStorage.getItem("nombreUsuario");

if (!nombreUsuario) {
  Swal.fire({
    title: 'Por favor, ingresa tu nombre de usuario',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    showLoaderOnConfirm: true,
    preConfirm: (nombre) => {
      return new Promise((resolve, reject) => {
        if (nombre) {
          localStorage.setItem("nombreUsuario", nombre.toUpperCase());
          resolve();
        } else {
          reject('Debes ingresar un nombre de usuario');
        }
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: '¡Bienvenido/a!',
        text: ` ${localStorage.getItem("nombreUsuario")}`,
        icon: 'success'
      });
      document.getElementById("nombre").innerHTML = "¡Bienvenido/a " + localStorage.getItem("nombreUsuario") + "!";
    }
  });
} else {
  document.getElementById("nombre").innerHTML = "¡Bienvenido/a " + nombreUsuario + "!";
}

// Acceso al DOM 👇 //


//Productos//

const imgCarrito = document.getElementById('carrito')
const imagenCarrito = 'img/carrito.png'
const titulo = document.getElementById('tituloProductos')
const subtitulo = document.getElementById('subtituloProductos')
const tarjetas = document.querySelector('div#tarjetas.tarjetas')

imgCarrito.src = imagenCarrito
titulo.textContent = "Productos de calidad para Barberias"
subtitulo.innerText = '"Comprá nuestros productos de manera online y aprovecha grandes descuentos y cuotas sin interés con tarjetas seleccionadas"'

//Eventos//

const sumaCarrito = document.querySelector('span#sumaCarrito');
const searchForm = document.getElementById('searchForm');
const inputSearch = document.getElementById('inputSearch');
const verCarrito = document.querySelector('#botonComprar');
// const URL = 'js/productos.json'; // JSON local
const URL = 'https://64d57e56b592423e469569e9.mockapi.io/API/v1/ProyectoFinal'; // mockapi.io

function TotalCarrito() {
  sumaCarrito.textContent = carritoProductos.length
}

verCarrito.addEventListener('click', () => {
  location.href = 'checkout.html';
})

searchForm.addEventListener('input', () => {
  localStorage.setItem("ultimaBusqueda", inputSearch.value)
  const resultado = arrayProductos.filter((producto) => producto.nombre.toLowerCase().includes(inputSearch.value.toLowerCase()));
  cargarProductos(resultado)
});

carritoProductos.length > 0 && TotalCarrito()

//Tarjetas Productos//

function retornarCardError() {
  return `<div class="tarjeta-error">
              <h2>Houston, tenemos un problema</h2>
              <h3>Vuelve a intentar en unos minutos...</h3>
              <h4>⏳</h4>
          </div>`
}

function retornarTarjetaProducto(producto) {
  const precioConDecimales = parseFloat(producto.precio).toFixed(2);
  return `<div class="tarjeta">
              <div class="imagen">
                  <img src="${producto.imagen}" />
              </div>
              <div class="tarjetasTitulo">
                  <h2>${producto.nombre} </h2>
              </div>
              <div class="marca">
                  <h3>${producto.marca}</h3>
              </div>
              <div class="precio">
                  <p>$ ${precioConDecimales}</p>
              </div>
              <div class="comprar"><button class="tarjetasBoton" id="${producto.id}">AGREGAR</button></div>
          </div>`;
}

function cargarProductos(array) {
  tarjetas.innerHTML = ""
  array.forEach((producto) => {
    tarjetas.innerHTML += retornarTarjetaProducto(producto)
  })

  activarClickEnBotones()
}

cargarProductos(arrayProductos)

//Botones//

function activarClickEnBotones() {
  const botones = document.querySelectorAll('.tarjetasBoton');
  botones.forEach((boton) => {
    boton.addEventListener('click', () => {
      let producto = arrayProductos.find((producto) => producto.id === parseInt(boton.id));
      carritoProductos.push(producto);
      localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos));
      guardarCarritoProductos()
      TotalCarrito();

      let precioConDecimales = parseFloat(producto.precio).toFixed(2);
      let html = '<td>$ ' + precioConDecimales + '</td>';

      Swal.fire({
        title: 'Producto Agregado',
        text: 'Click "OK" para ontinuar',
        imageUrl: producto.imagen,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
      CarritoCheckout();
    });
  });

}

// FETCH 👇//

function obtenerProductos() {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => arrayProductos.push(...data))
    .then(() => cargarProductos(arrayProductos))
    .catch((error) => container.innerHTML = retornarCardError())
}

obtenerProductos() 