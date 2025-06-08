console.log("✅ proposals.js cargado");

const AÑOS_DIBUJOS = ["2011", "2012", "2013", "2024"];
const contenedor = document.getElementById("obras-content");

// Crear el título
const titulo = document.createElement("h2");
titulo.className = "category-title";
titulo.textContent = "Drawings";
contenedor.appendChild(titulo);

// Crear la fila para los covers
const fila = document.createElement("div");
fila.className = "cover-row";

// Cargar el JSON real
fetch("../data/artworks_with_dimensions.json")
  .then(res => res.json())
  .then(data => {
    const dibujos = data.drawings;

    AÑOS_DIBUJOS.forEach(anio => {
      const obrasDelAnio = dibujos[anio] || [];

      if (obrasDelAnio.length > 0) {
        const obra = obrasDelAnio[Math.floor(Math.random() * obrasDelAnio.length)];

        const item = document.createElement("div");
        item.className = "cover-item";

        const img = document.createElement("img");
        img.src = obra.image;
        img.alt = obra.title || "Obra sin título";

        const year = document.createElement("div");
        year.className = "cover-year";
        year.textContent = anio;

        item.appendChild(img);
        item.appendChild(year);
        fila.appendChild(item);
      }
    });

    contenedor.appendChild(fila);
  })
  .catch(err => console.error("❌ Error al cargar el JSON:", err));
