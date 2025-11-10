// === CLASES DE PRODUCTOS Y LISTA DOBLE ===
class Producto {
  constructor(nombre, precio, img) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
  }

  toString() {
    return `Producto{nombre=${this.nombre}, precio=${this.precio}}`;
  }
}

class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
    this.prev = null;
  }
}

class ListaDoble {
  constructor() {
    this.first = null;
    this.last = null;
    this.count = 0;
  }

  isEmpty() {
    return this.first === null;
  }

  size() {
    return this.count;
  }

  adicionar(item) {
    this.adicionarFinal(item);
  }

  adicionarInicio(item) {
    const node = new Node(item);
    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      node.next = this.first;
      this.first.prev = node;
      this.first = node;
    }
    this.count++;
  }

  adicionarFinal(item) {
    const node = new Node(item);
    if (this.isEmpty()) {
      this.first = node;
      this.last = node;
    } else {
      node.prev = this.last;
      this.last.next = node;
      this.last = node;
    }
    this.count++;
  }

  obtenerPrimero() {
    return this.first ? this.first.item : null;
  }

  obtenerFinal() {
    return this.last ? this.last.item : null;
  }

  quitarPrimero() {
    if (this.isEmpty()) return null;
    const item = this.first.item;
    this.first = this.first.next;
    if (this.first) this.first.prev = null;
    else this.last = null;
    this.count--;
    return item;
  }

  quitarUltimo() {
    if (this.isEmpty()) return null;
    const item = this.last.item;
    this.last = this.last.prev;
    if (this.last) this.last.next = null;
    else this.first = null;
    this.count--;
    return item;
  }

  vaciar() {
    this.first = null;
    this.last = null;
    this.count = 0;
  }

  obtener(index) {
    if (index < 0 || index >= this.count) return null;

    let current;
    if (index <= this.count / 2) {
      current = this.first;
      for (let i = 0; i < index; i++) current = current.next;
    } else {
      current = this.last;
      for (let i = this.count - 1; i > index; i--) current = current.prev;
    }
    return current.item;
  }

  [Symbol.iterator]() {
    let current = this.first;
    return {
      next() {
        if (current) {
          const value = current.item;
          current = current.next;
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

// === LISTA DE PRODUCTOS ===
const listaProductos = new ListaDoble();

// === FUNCIONES PARA EL CARRITO ===
function agregarAlCarrito(nombre, precio, img) {
  const carritoItems = document.getElementById("carrito-items");
  const totalElem = document.getElementById("total");
  const contador = document.getElementById("contador");

  const itemDiv = document.createElement("div");
  itemDiv.textContent = `${nombre} - $${precio.toLocaleString()}`;
  carritoItems.appendChild(itemDiv);

  // Actualizar total
  const total = [...carritoItems.children].reduce((sum, div) => {
    return sum + parseInt(div.textContent.split("$")[1].replace(/,/g, ""));
  }, 0);
  totalElem.textContent = `Total: $${total.toLocaleString()}`;

  // Actualizar contador
  contador.textContent = carritoItems.children.length;
}

function vaciarCarrito() {
  document.getElementById("carrito-items").innerHTML = "";
  document.getElementById("total").textContent = "Total: $0";
  document.getElementById("contador").textContent = "0";
}

// === CARGAR PRODUCTOS DESDE ENDPOINT ===
function cargarProductos() {
  fetch("https://miapp.azurewebsites.net/api/productos") // Reemplaza con tu URL de Azure
    .then(res => res.json())
    .then(productos => {
      productos.forEach(p => {
        listaProductos.adicionar(new Producto(p.nombre, p.precio, p.img));
      });

      // Renderizar productos en HTML
      const productosContainer = document.querySelector(".productos");
      if (productosContainer) {
        productosContainer.innerHTML = [...listaProductos].map(p => `
          <div class="producto">
            <img src="${p.img}" alt="${p.nombre}" />
            <h3>${p.nombre}</h3>
            <p>$${p.precio.toLocaleString()}</p>
            <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio}, '${p.img}')">Agregar al carrito</button>
          </div>
        `).join("");
      }
    })
    .catch(err => console.error("Error cargando productos:", err));
}

// === ENVIAR FORMULARIO DE CONTACTO A ENDPOINT ===
function enviarContacto() {
  const form = document.getElementById("formContacto");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      mensaje: form.mensaje.value
    };

    fetch("https://miapp.azurewebsites.net/api/contacto", { // Reemplaza con tu URL de Azure
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(resp => {
      alert("Mensaje enviado correctamente!");
      form.reset();
    })
    .catch(err => console.error("Error enviando contacto:", err));
  });
}

// === INICIALIZACIÓN ===
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  enviarContacto();
});
