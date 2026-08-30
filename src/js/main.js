const popularMovies = [
  {
    title: "Cidade Neon",
    year: 2025,
    genre: "Ficção científica",
    gradient: "from-orange-400 via-rose-500 to-fuchsia-800",
  },
  {
    title: "Sol de Inverno",
    year: 2024,
    genre: "Drama",
    gradient: "from-amber-300 via-orange-500 to-red-800",
  },
  {
    title: "A Última Ilha",
    year: 2025,
    genre: "Aventura",
    gradient: "from-emerald-300 via-teal-600 to-slate-900",
  },
  {
    title: "Vértice",
    year: 2023,
    genre: "Suspense",
    gradient: "from-violet-400 via-purple-700 to-slate-950",
  },
];

function renderPopularMovies() {
  const popularMoviesContainer = document.querySelector("#popular-movies");

  const moviesHtml = popularMovies
    .map((movie) => {
      return `
        <article class="catalog-card">
          <div class="h-48 bg-gradient-to-br ${movie.gradient}"></div>
          <div class="p-4">
            <h3 class="font-semibold text-white">${movie.title}</h3>
            <p class="mt-1 text-sm text-slate-400">${movie.year} · ${movie.genre}</p>
          </div>
        </article>
      `;
    })
    .join("");

  popularMoviesContainer.innerHTML = moviesHtml;
}

renderPopularMovies();
