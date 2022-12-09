// Variables
const titulo = document.querySelector("#titulo"),
  autor = document.querySelector("#autor"),
  isbn = document.querySelector("#isbn"),
  categoria = document.querySelector("#categoria"),
  precio = document.querySelector("#precio"),
  img = document.querySelector("#img"),
  search = document.querySelector("#search"),
  tbody = document.querySelector("#table-body"),
  btnGuardar = document.querySelector("#btnGuardar");
const radios = document.querySelectorAll('input[type="radio"]');

// Constantes
const INVENTARIO_KEY = "inventario";

//Constructor del clase Libro
class Libro {
  constructor(titulo, autor, isbn, categoria, precio, img) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.categoria = categoria;
    this.precio = precio == "" ? 1 : parseFloat(precio);
    //Si campo img vacío img genérica
    this.img = img == "" ? "https://via.placeholder.com/150" : img;
  }
}

//Seteo variable libros, si LS vacio entonces libros = []
const inventarioSaved = recuperarLS(INVENTARIO_KEY);

let libros = inventarioSaved ? inventarioSaved : await getInventario();

/* Declaración de Funciones */
//Cargar al inventario
function agregarLibroInventario(arr, libro) {
  return arr.push(libro);
}
//Funciones de LS
function guardarLS(arr) {
  localStorage.setItem(INVENTARIO_KEY, JSON.stringify(arr));
}

function recuperarLS(key) {
  return JSON.parse(localStorage.getItem(key));
}

async function getInventario() {
  const url =
    "https://raw.githubusercontent.com/bryanleonardo7/ProyectoFinalHuamani/main/data/inventario.json";

  const response = await fetch(url);
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return [
      {
        titulo: "cuentos completos",
        autor: "edgard alan poe",
        isbn: "9788491052166",
        categoria: "cuento",
        precio: 2500.99,
        img: "http://boutiquedezothique.es/793-large_default/cuentos-completos-edgar-allan-poe.jpg",
      },
      {
        titulo: "quien pierde paga",
        autor: "stephen king",
        isbn: "9789506443924",
        categoria: "terror",
        precio: 1800.99,
        img: "http://d2r9epyceweg5n.cloudfront.net/stores/001/421/275/products/king_quienpierdepaga_libro3d1-186af08b4fbf47f81116071041288636-640-0.png",
      },
    ];
  }
}

//Función de búsqueda genérica
function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    if (param == "precio") {
      return el[`${param}`] <= parseFloat(filtro);
    } else {
      return el[`${param}`].toLowerCase().includes(filtro.toLowerCase().trim());
    }
  });
}

//Manipular el DOM
function crearHtml(arr) {
  tbody.innerHTML = "";

  let html = "";
  for (const item of arr) {
    html = `<tr>
          <td>${item.titulo}</td>
          <td>${item.autor}</td>
          <td>${item.isbn}</td>
          <td>${item.categoria}</td>
          <td>${item.precio}</td>
          <td><img src="${item.img}"/></td>
          <td>
            <button class="btn red" id="${item.isbn}">
              <i class="material-icons">delete_forever</i>Borrar
            </button>
          </td>
        </tr>`;
    tbody.innerHTML += html;
  }

  /* Agregar eventos a los botones */
  const arrayBotones = document.querySelectorAll("td .btn");
  arrayBotones.forEach((btn) => {
    btn.addEventListener("click", () => {
      //   console.log(btn.id);
      libros = libros.filter((el) => el.isbn != btn.id);
      guardarLS(libros);
      crearHtml(libros);
    });
  });
}

function limpiarCampos() {
  titulo.value = "";
  autor.value = "";
  isbn.value = "";
  categoria.value = "";
  precio.value = "";
  img.value = "";
}
/* Fin de funciones */

/* Ejecución de funciones */
guardarLS(libros);
crearHtml(libros);

//Listeners
btnGuardar.addEventListener("click", () => {
  const nuevoLibro = new Libro(
    titulo.value,
    autor.value,
    isbn.value,
    categoria.value,
    precio.value,
    img.value
  );
  agregarLibroInventario(libros, nuevoLibro);
  limpiarCampos();
  guardarLS(libros);
  crearHtml(libros);
});

//Listeners de búsqueda
search.addEventListener("input", () => {
  let nuevoFiltro = filtrar(libros, search.value, "titulo");
  crearHtml(nuevoFiltro);
});

//Busqueda personalizada
for (const radio of radios) {
  //   console.log(radio);
  radio.addEventListener("change", () => {
    if (radio.checked) {
      //llamo al funcion generica
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(libros, search.value, radio.value);
        crearHtml(nuevoFiltro);
      });
    }
  });
}
