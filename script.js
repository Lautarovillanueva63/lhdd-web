// Año automático en el footer
document.getElementById("year").textContent = new Date().getFullYear();

// ===================================================
// TODO: pegá acá el link de YouTube del último lanzamiento.
// Este único valor alimenta el banner de "Hoy Es Hoy 3".
// ===================================================
const LINK_ULTIMO_LANZAMIENTO = "https://www.youtube.com/watch?v=X3K3ikv08H0&list=RDX3K3ikv08H0&start_radio=1";
document.querySelector("[data-youtube]").href = LINK_ULTIMO_LANZAMIENTO;

// ===================================================
// TODO: pegá acá los links reales de las redes.
// Todos los <a data-red="instagram"> del sitio (hero, contacto, etc.)
// se completan solos desde este objeto.
// ===================================================
const REDES = {
  instagram: "https://www.instagram.com/loshijosdelduenorock/?hl=es",
  spotify: "https://open.spotify.com/intl-es/artist/036L2vq14eaHundxBmeVj4",
  youtube: "https://www.youtube.com/channel/UC3lcvHumoHH9EqMNOUZTDpA",
};
document.querySelectorAll("[data-red]").forEach(link => {
  const red = link.getAttribute("data-red");
  if (REDES[red]) link.href = REDES[red];
});

// ===================================================
// NAV: se achica al scrollear
// ===================================================
const nav = document.getElementById("nav");
const UMBRAL_SCROLL = 80; // píxeles scrolleados antes de achicar el nav

function actualizarNav() {
  nav.classList.toggle("nav--chico", window.scrollY > UMBRAL_SCROLL);
}
window.addEventListener("scroll", actualizarNav);
actualizarNav();

// Menú hamburguesa en mobile
const navToggle = document.getElementById("navToggle");
const navLinksBox = document.querySelector(".nav__links");

navToggle.addEventListener("click", () => {
  navLinksBox.classList.toggle("is-open");
});

document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    navLinksBox.classList.remove("is-open");
  });
});

// Scrollspy: marca en el nav la sección que se está viendo
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".nav__link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-50% 0px -50% 0px" }
);
sections.forEach(section => observer.observe(section));

// ===================================================
// MODAL DE PRODUCTO — solo visual, no hay carrito ni pago real
// ===================================================
const modal = document.getElementById("modal");
const modalFoto = document.getElementById("modalFoto");
const modalNombre = document.getElementById("modalNombre");
const modalPrecio = document.getElementById("modalPrecio");
const modalTalles = document.getElementById("modalTalles");
const modalCuotas = document.getElementById("modalCuotas");
const modalCarrito = document.getElementById("modalCarrito");

function abrirModal(producto) {
  modalFoto.style.backgroundImage = `url('${producto.dataset.img}')`;
  modalNombre.textContent = producto.dataset.nombre;
  modalPrecio.textContent = producto.dataset.precio;
  modalTalles.textContent = `Talles: ${producto.dataset.talles}`;
  modalCuotas.textContent = producto.dataset.cuotas;

  // Reseteamos el botón cada vez que se abre un producto nuevo
  modalCarrito.textContent = "Agregar al carrito";
  modalCarrito.classList.remove("is-agregado");

  modal.classList.add("is-open");
}

function cerrarModal() {
  modal.classList.remove("is-open");
}

document.querySelectorAll(".producto").forEach(producto => {
  producto.addEventListener("click", () => abrirModal(producto));
});

document.getElementById("modalCerrar").addEventListener("click", cerrarModal);
document.getElementById("modalBackdrop").addEventListener("click", cerrarModal);

// Solo cambia el texto/color del botón. No hay carrito real ni pago: es visual.
modalCarrito.addEventListener("click", () => {
  modalCarrito.textContent = "Agregado ✓";
  modalCarrito.classList.add("is-agregado");
});
