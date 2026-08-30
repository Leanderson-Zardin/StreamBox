const TMDB_POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let popularMovies = [];

function renderPopularMovies(movies) {
  const popularMoviesContainer = document.querySelector("#popular-movies");

  if (movies.length === 0) {
    popularMoviesContainer.innerHTML = `
      <p class="col-span-full py-6 text-center text-slate-400">
        Nenhum filme encontrado.
      </p>
    `;
    return;
  }

  const moviesHtml = movies
    .map((movie) => {
      const releaseYear = movie.release_date
        ? movie.release_date.slice(0, 4)
        : "Ano não informado";

      const poster = movie.poster_path
        ? `<img
            src="${TMDB_IMAGE_BASE_URL}${movie.poster_path}"
            alt="Pôster de ${movie.title}"
            class="h-48 w-full object-cover"
          />`
        : `<div class="flex h-48 items-center justify-center bg-slate-800 p-4 text-center text-sm text-slate-400">
            Pôster indisponível
          </div>`;

      return `
        <article class="catalog-card">
          ${poster}
          <div class="p-4">
            <h3 class="font-semibold text-white">${movie.title}</h3>
            <p class="mt-1 text-sm text-slate-400">${releaseYear}</p>
          </div>
        </article>
      `;
    })
    .join("");

  popularMoviesContainer.innerHTML = moviesHtml;
}

async function loadPopularMovies() {
  const popularMoviesContainer = document.querySelector("#popular-movies");

  popularMoviesContainer.innerHTML = `
    <p class="col-span-full py-6 text-center text-slate-400">
      Carregando filmes populares...
    </p>
  `;

  try {
    const response = await fetch(TMDB_POPULAR_MOVIES_URL, {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Não foi possível carregar os filmes populares.");
    }

    const data = await response.json();
    popularMovies = data.results;

    const searchText = searchInput.value.toLowerCase();
    const filteredMovies = popularMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchText);
    });

    renderPopularMovies(filteredMovies);
  } catch (error) {
    popularMoviesContainer.innerHTML = `
      <p class="col-span-full py-6 text-center text-rose-400">
        Não foi possível carregar os filmes. Tente novamente mais tarde.
      </p>
    `;
  }
}

const searchInput = document.querySelector("#busca");

searchInput.addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase();
  const filteredMovies = popularMovies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchText);
  });

  renderPopularMovies(filteredMovies);
});

loadPopularMovies();
