import React, { useState } from 'react';
import Api from './components/Api';
import Find from './components/Find';

const App = () => {
  const [movies, setMovies] = useState([]);

  const config = {
    api: import.meta.env.VITE_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3/',
    imageUrl: 'https://image.tmdb.org/t/p/w1280',
  };

  const handleClick = async (page = 1) => {
    let data = [];
    try {
      const response = await fetch(
        `${config.baseUrl}movie/popular?api_key=${config.api}&page=${page}`
      );
      const responseData = await response.json();
      data = responseData?.results;
      setMovies(data);
    } catch (error) {}
    console.log(data);
  };

  return (
    <div className="text-4xl w-screen bg-indigo-400 flex justify-center items-center flex-col">
      <Find />
      <Api handleClick={handleClick} />
      <button onClick={() => setMovies(null)}>clear</button>
      <div className="grid grid-cols-4">
        {movies?.map((movie) => (
          <div key={movie.id} className="w-fit text-sm m-2">
            <img src={`${config.imageUrl}${movie.poster_path}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
