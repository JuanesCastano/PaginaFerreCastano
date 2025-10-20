// === CAMBIO DE SECCIONES ===
const enlaces = document.querySelectorAll("nav a");
const secciones = document.querySelectorAll(".seccion");

enlaces.forEach(enlace => {
  enlace.addEventListener("click", e => {
    e.preventDefault();
    enlaces.forEach(a => a.classList.remove("activo"));
    enlace.classList.add("activo");

    const id = enlace.getAttribute("data-seccion");
    secciones.forEach(sec => sec.classList.remove("activa"));
    document.getElementById(id).classList.add("activa");
  });
});

// === CARRITO ===
let carrito = [];
const carritoDiv = document.getElementById("carrito");
const carritoItems = document.getElementById("carrito-items");
const contador = document.getElementById("contador");
const total = document.getElementById("total");

document.getElementById("carrito-btn").addEventListener("click", () => {
  carritoDiv.classList.toggle("activo");
});

function agregarAlCarrito(nombre, precio, img) {
  const item = carrito.find(i => i.nombre === nombre);
  if (item) item.cantidad++;
  else carrito.push({ nombre, precio, img, cantidad: 1 });
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoItems.innerHTML = "";
  let totalCompra = 0;

  carrito.forEach(item => {
    totalCompra += item.precio * item.cantidad;
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <img src="${item.img}" width="40"> 
      <span>${item.nombre}</span>
      <span>x${item.cantidad}</span>
      <button onclick="aumentarCantidad('${item.nombre}')">+</button>
    `;
    carritoItems.appendChild(div);
  });

  contador.textContent = carrito.reduce((acc, i) => acc + i.cantidad, 0);
  total.textContent = `Total: $${totalCompra.toLocaleString()}`;
}

function aumentarCantidad(nombre) {
  const item = carrito.find(i => i.nombre === nombre);
  if (item) item.cantidad++;
  actualizarCarrito();
}

document.getElementById("finalizarCompra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("Compra finalizada. Se generará un documento con tu pedido.");
});

// === FORMULARIO ===
document.getElementById("formContacto").addEventListener("submit", e => {
  e.preventDefault();
  alert("Mensaje enviado. Se guardará en un archivo .docx (simulado).");
});
