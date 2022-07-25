import React, { useRef, useState } from 'react';
import SearchPerson from './components/SearchPerson';
import ChainIcon from './components/ChainIcon';

const App = () => {
  const [queries, setQueries] = useState([]);
  const [choice, setChoice] = useState({});
  const inputRef = useRef();

  const config = {
    api: import.meta.env.VITE_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3/',
    imageUrl: 'https://image.tmdb.org/t/p/w1280',
    discoverMovie: 'discover/movie',
    searchPerson: 'search/person',
    searchMovie: 'search/movie',
    searchMulti: 'search/multi',
    language: 'en-US',
    sortBy: 'popularity.desc',
  };

  async function getQueries(page = 1) {
    let data = [];
    try {
      const response = await fetch(
        `${config.baseUrl}${config.searchPerson}?api_key=${config.api}&query=${inputRef.current.value}&page=${page}&sort_by=${config.sortBy}`
        // `${config.baseUrl}${type}?&api_key=${config.api}&page=${page}`
      );
      const responseData = await response.json();
      data = responseData?.results;
      setQueries(data);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    getQueries();
  };

  const handleClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <div className="p-6 text-4xl w-screen  bg-indigo-400 flex justify-start items-center flex-col">
      <div className="flex items-center pb-5">
        Movie
        <ChainIcon /> Chain
      </div>
      <form className="flex flex-col " onSubmit={handleSearch}>
        <input ref={inputRef} />
        <button type="reset" onClick={() => setQueries(null)}>
          clear
        </button>
      </form>
      <div className="grid grid-cols-4 gap-20">
        <SearchPerson onClick={handleClick} queries={queries} />
      </div>
    </div>
  );
};

export default App;
