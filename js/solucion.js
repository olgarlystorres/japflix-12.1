/*Offcanvas (menú desplegable): Los menús desplegables son superposiciones 
contextuales que se pueden alternar para mostrar listas de enlaces y más.
//Dropdowns(Fuera de lienzo): es un componente de barra lateral que se puede activar o desactivar
 mediante JavaScript para que aparezca en el borde izquierdo, derecho, superior o inferior de la ventana gráfica.*/ 


document.addEventListener('DOMContentLoaded', () => {
  // Elementos de la interfaz
  const inputBuscar = document.getElementById('inputBuscar');
  const btnBuscar = document.getElementById('btnBuscar');
  const lista = document.getElementById('lista');
  const movieDetails = document.getElementById('Detalles'); // Contenedor del offcanvas
  const offcanvasElement = document.getElementById('desplegable'); // deplegable del offcanvas principal

  // URL de la API de películas
  const API_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
  let peliculas = [];

  // Función para cargar datos desde la API
  async function cargarPeliculas() {
    try {
      const response = await fetch(API_URL);
      peliculas = await response.json(); // Cargar y guardar todas las películas
      console.log("Películas cargadas correctamente:", peliculas); // Verificar si las películas se cargaron correctamente al guardar
    } catch (error) {
      console.error('Error al cargar las películas:', error);
      lista.innerHTML = '<li class="list-group-item">Hubo un error al cargar las películas. Inténtalo más tarde.</li>';
    }
  }

  // Función para realizar la búsqueda de películas
  function buscarPeliculas() {
    const query = inputBuscar.value.trim().toLowerCase(); // Convertir búsqueda a minúsculas
    lista.innerHTML = ''; // Limpiar resultados anteriores

    if (query === '') {
      lista.innerHTML = '<li class="list-group-item">Por favor, ingresa un título de película.</li>';
      return;
    }

    // Ayuda a Filtrar películas que contengan el texto ingresado en el título
    const resultados = peliculas.filter(pelicula =>
      pelicula.title.toLowerCase().includes(query)
    );

    // Muestra los resultados
    if (resultados.length > 0) {
      mostrarResultados(resultados);
    } else {
      lista.innerHTML = `<li class="list-group-item">No se encontraron resultados para "${query}".</li>`;
    }
  }

  // Muestra la lista de películas que se están buscando
  function mostrarResultados(resultados) {
    lista.innerHTML = ''; // Limpia la lista
    console.log("Mostrando resultados:", resultados); // Verifica que haya resultados

    resultados.forEach(pelicula => {
      const item = document.createElement('li');
      item.classList.add('list-group-item', 'bg-light', 'text-dark', 'mb-2', 'cursor-pointer');
      item.style.cursor = 'pointer';

      const title = pelicula.title || 'Título no disponible';
      const release_date = pelicula.release_date ? pelicula.release_date.substring(0, 4) : 'Sin fecha';
      const genres = pelicula.genres && pelicula.genres.length > 0 ? pelicula.genres.map(g => g.name).join(', ') : 'Género no disponible';

      item.innerHTML = `
        <h5>${title} (${release_date})</h5>
        <p><strong>Género:</strong> ${genres}</p>
      `;

      // Agregar evento de clic para mostrar detalles 
      item.addEventListener('click', () => mostrarDetalles(pelicula));

      lista.appendChild(item);
    });
  }

  // Función para mostrar los detalles en la parte desplegable de la pantalla
  function mostrarDetalles(pelicula) {
    const title = pelicula.title || 'Título no disponible';
    const release_date = pelicula.release_date || 'Sin fecha';
    const overview = pelicula.overview || 'Sin descripción disponible';
    const genres = pelicula.genres && pelicula.genres.length > 0 ? pelicula.genres.map(g => g.name).join(', ') : 'Género no disponible';
    const vote_average = pelicula.vote_average || 'No disponible';

    // Aca acualizamos todo el contenido de la parte del detalle de la pelicula
    Detalles.innerHTML = `
      <h5>${title} (${release_date})</h5>
      <p><strong>Género:</strong> ${genres}</p>
      <p><strong>Descripción:</strong> ${overview}</p>
      <p><strong>Calificación:</strong> ${vote_average}</p>
    `;

    // Mostrar el desplegable
    const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
    offcanvas.show();
  }

  // Agregar evento al botón de búsqueda
  btnBuscar.addEventListener('click', buscarPeliculas);

  // Cargar películas al inicio
  cargarPeliculas();
});

