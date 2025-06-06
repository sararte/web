const jsonPath = 'data/artworks_with_dimensions.json';
const background = document.getElementById('background');

// Verifica si una obra es horizontal usando los campos numéricos
function esHorizontal(obra) {
  return obra.width && obra.height && obra.width > obra.height;
}

const contenedor = document.getElementById('contenedor');
const imagenTag = document.getElementById('imagen');

async function obtenerImagenesHorizontales() {
  const res = await fetch('data/artworks_with_dimensions.json');
  const data = await res.json();
  const imagenes = [];

  for (const categoria in data) {
    for (const anio in data[categoria]) {
      for (const obra of data[categoria][anio]) {
        if (obra.orientation === "horizontal") {
          imagenes.push(obra.image.replace('..', '.'));
        }
      }
    }
  }

  return imagenes;
}

async function iniciarPresentacion() {
  const imagenes = await obtenerImagenesHorizontales();
  if (imagenes.length === 0) return;

  let indice = 0;

  function cambiarImagen() {
    imagenTag.style.opacity = 0;

    setTimeout(() => {
      indice = (indice + 1) % imagenes.length;
      imagenTag.src = imagenes[indice];
      imagenTag.style.opacity = 1;
    }, 1000); // espera antes de mostrar la nueva
  }

  imagenTag.src = imagenes[0];
  imagenTag.style.opacity = 1;

  setInterval(cambiarImagen, 6000);
}

iniciarPresentacion();


// Extrae imágenes horizontales desde el JSON nuevo
/* async function obtenerImagenesHorizontales() {
  const res = await fetch(jsonPath);
  const data = await res.json();
  const imagenesHorizontales = [];


  for (const categoria in data) {
  for (const anio in data[categoria]) {
    for (const obra of data[categoria][anio]) {
      if (obra.orientation === "horizontal") {
  imagenesHorizontales.push(obra.image.replace('..', '.'));
}

    }
  }
}



  return imagenesHorizontales;
}


// Muestra una imagen aleatoria cada 6 segundos
const capa1 = document.getElementById('background1');
const capa2 = document.getElementById('background2');

let visible = true;

function cambiarImagenSuave(imagen) {

  const activa = visible ? capa1 : capa2;
  const inactiva = visible ? capa2 : capa1;

  inactiva.style.backgroundImage = `url('${imagen}')`;
  inactiva.style.opacity = 1;
  activa.style.opacity = 0;

  visible = !visible;
}

async function iniciarPresentacion() {
  const imagenes = await obtenerImagenesHorizontales();

  if (imagenes.length === 0) return;

  let indiceActual = 0;

  function cambiarImagen() {
    indiceActual = (indiceActual + 1) % imagenes.length;
    cambiarImagenSuave(imagenes[indiceActual]);
  }

  // Mostrar la primera imagen sin transición
  capa1.style.backgroundImage = `url('${imagenes[0]}')`;
  capa1.style.opacity = 1;

  setInterval(cambiarImagen, 6000); // cada 6 segundos
}



iniciarPresentacion();
 */