const TMDB_POPULAR_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1";
const TMDB_TOP_RATED_MOVIES_URL =
  "https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1";
const TMDB_POPULAR_SERIES_URL =
  "https://api.themoviedb.org/3/tv/popular?language=pt-BR&page=1";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

let popularMovies = [];

async function getTmdbResults(url) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar os dados do TMDB.");
  }

  const data = await response.json();
  return data.results;
}

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
        ? `<img src="${TMDB_IMAGE_BASE_URL}${movie.poster_path}" alt="Pôster de ${movie.title}" class="aspect-[2/3] w-full object-cover" />`
        : `<div class="flex aspect-[2/3] w-full items-center justify-center bg-slate-800 p-4 text-center text-sm text-slate-400">Pôster indisponível</div>`;

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

function renderTopRatedMovies(movies) {
  const topRatedMoviesContainer = document.querySelector("#top-rated-movies");

  const moviesHtml = movies
    .map((movie) => {
      const releaseYear = movie.release_date
        ? movie.release_date.slice(0, 4)
        : "Ano não informado";
      const poster = movie.poster_path
        ? `<img src="${TMDB_IMAGE_BASE_URL}${movie.poster_path}" alt="Pôster de ${movie.title}" class="aspect-[2/3] w-full object-cover" />`
        : `<div class="flex aspect-[2/3] w-full items-center justify-center bg-slate-800 p-4 text-center text-sm text-slate-400">Pôster indisponível</div>`;

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

  topRatedMoviesContainer.innerHTML = moviesHtml;
}

function renderPopularSeries(series) {
  const popularSeriesContainer = document.querySelector("#popular-series");

  const seriesHtml = series
    .map((tvSeries) => {
      const firstAirYear = tvSeries.first_air_date
        ? tvSeries.first_air_date.slice(0, 4)
        : "Ano não informado";
      const poster = tvSeries.poster_path
        ? `<img src="${TMDB_IMAGE_BASE_URL}${tvSeries.poster_path}" alt="Pôster de ${tvSeries.name}" class="aspect-[2/3] w-full object-cover" />`
        : `<div class="flex aspect-[2/3] w-full items-center justify-center bg-slate-800 p-4 text-center text-sm text-slate-400">Pôster indisponível</div>`;

      return `
        <article class="catalog-card">
          ${poster}
          <div class="p-4">
            <h3 class="font-semibold text-white">${tvSeries.name}</h3>
            <p class="mt-1 text-sm text-slate-400">${firstAirYear}</p>
          </div>
        </article>
      `;
    })
    .join("");

  popularSeriesContainer.innerHTML = seriesHtml;
}

async function loadPopularMovies() {
  const popularMoviesContainer = document.querySelector("#popular-movies");
  popularMoviesContainer.innerHTML = `<p class="col-span-full py-6 text-center text-slate-400">Carregando filmes populares...</p>`;

  try {
    popularMovies = await getTmdbResults(TMDB_POPULAR_MOVIES_URL);

    const searchText = searchInput.value.toLowerCase();
    const filteredMovies = popularMovies.filter((movie) => {
      return movie.title.toLowerCase().includes(searchText);
    });

    renderPopularMovies(filteredMovies);
  } catch (error) {
    popularMoviesContainer.innerHTML = `<p class="col-span-full py-6 text-center text-rose-400">Não foi possível carregar os filmes. Tente novamente mais tarde.</p>`;
  }
}

async function loadTopRatedMovies() {
  const topRatedMoviesContainer = document.querySelector("#top-rated-movies");
  topRatedMoviesContainer.innerHTML = `<p class="col-span-full py-6 text-center text-slate-400">Carregando filmes mais bem avaliados...</p>`;

  try {
    const movies = await getTmdbResults(TMDB_TOP_RATED_MOVIES_URL);
    renderTopRatedMovies(movies);
  } catch (error) {
    topRatedMoviesContainer.innerHTML = `<p class="col-span-full py-6 text-center text-rose-400">Não foi possível carregar os filmes. Tente novamente mais tarde.</p>`;
  }
}

async function loadPopularSeries() {
  const popularSeriesContainer = document.querySelector("#popular-series");
  popularSeriesContainer.innerHTML = `<p class="col-span-full py-6 text-center text-slate-400">Carregando séries populares...</p>`;

  try {
    const series = await getTmdbResults(TMDB_POPULAR_SERIES_URL);
    renderPopularSeries(series);
  } catch (error) {
    popularSeriesContainer.innerHTML = `<p class="col-span-full py-6 text-center text-rose-400">Não foi possível carregar as séries. Tente novamente mais tarde.</p>`;
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
loadTopRatedMovies();
loadPopularSeries();
