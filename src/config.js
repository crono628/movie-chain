const config = {
  api: import.meta.env.VITE_API_KEY,
  baseUrl: 'https://api.themoviedb.org/3/',
  imageUrl: 'https://image.tmdb.org/t/p/w1280',
  discoverMovie: 'discover/movie',
  searchPerson: 'search/person',
  searchMovie: 'search/movie',
  searchMulti: 'search/multi',
  personMovieCredits: (choice) => `person/${choice}/movie_credits`,
  personTvCredits: (choice) => `person/${choice}/tv_credits`,

  language: 'en-US',
  sortBy: 'popularity.desc',
};

export default config;
