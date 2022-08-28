const config = {
  api: import.meta.env.VITE_API_KEY,
  baseUrl: 'https://api.themoviedb.org/3/',
  imageUrl: 'https://image.tmdb.org/t/p/w1280',
  withPeople: (choice) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_people=${choice}`,

  discoverMovie: 'discover/movie',
  searchPerson: 'search/person',
  searchMovie: 'search/movie',
  searchMulti: 'search/multi',
  personMovieCredits: (choice) =>
    `https://api.themoviedb.org/3/person/${choice}/movie_credits?api_key=${
      import.meta.env.VITE_API_KEY
    }&language=en-US`,
  personCombinedCredits: (choice) => `person/${choice}/combined_credits`,
  movieCredits: (choice) => `movie/${choice}/credits`,
  language: 'en-US',
  sortBy: 'popularity.desc',
};

export default config;
