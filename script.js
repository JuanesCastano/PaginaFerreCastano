// 🛒 Carrito
const abrirCarrito = document.getElementById("abrir-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const carrito = document.getElementById("carrito");
const overlay = document.getElementById("overlay");
const contador = document.getElementById("contador");
const itemsCarrito = document.getElementById("items-carrito");
const total = document.getElementById("total");

let carritoItems = [];
let sumaTotal = 0;

abrirCarrito.addEventListener("click", () => {
  carrito.classList.add("visible");
  overlay.classList.add("visible");
});

cerrarCarrito.addEventListener("click", () => {
  carrito.classList.remove("visible");
  overlay.classList.remove("visible");
});

overlay.addEventListener("click", () => {
  carrito.classList.remove("visible");
  overlay.classList.remove("visible");
});

// 🧺 Agregar productos
document.querySelectorAll(".agregar").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".producto");
    const producto = card.querySelector("h3").textContent;
    const precio = parseInt(card.querySelector("p").textContent.replace("$", "").replace(".", ""));
    const imagen = card.querySelector("img").src;

    carritoItems.push({ producto, precio, imagen });
    sumaTotal += precio;

    contador.textContent = carritoItems.length;
    total.textContent = `Total: $${sumaTotal.toLocaleString()}`;
    renderCarrito();
  });
});

function renderCarrito() {
  itemsCarrito.innerHTML = "";
  carritoItems.forEach((item, i) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.producto}">
      <div class="info-item">
        <p>${item.producto}</p>
        <p class="precio">$${item.precio.toLocaleString()}</p>
      </div>
      <button class="eliminar" data-index="${i}">✖</button>
    `;
    itemsCarrito.appendChild(div);
  });

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      sumaTotal -= carritoItems[i].precio;
      carritoItems.splice(i, 1);
      contador.textContent = carritoItems.length;
      total.textContent = `Total: $${sumaTotal.toLocaleString()}`;
      renderCarrito();
    });
  });
}

// 📍 Navegación entre secciones
document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    document.querySelectorAll(".seccion").forEach(sec => sec.classList.remove("activa"));
    const target = e.target.getAttribute("href");
    document.querySelector(target).classList.add("activa");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Mostrar "Quiénes somos" al inicio
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#quienes").classList.add("activa");
});
