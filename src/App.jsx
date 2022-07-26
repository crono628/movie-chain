import React, { useRef, useState } from 'react';
import SearchPerson from './components/SearchPerson';
import ChainIcon from './components/ChainIcon';
import Choice from './components/Choice';
import SearchMovie from './components/SearchMovie';

const App = () => {
  const [queries, setQueries] = useState([]);
  const [choice, setChoice] = useState({});
  const [radio, setRadio] = useState({ movie: true, person: false });
  const inputRef = useRef('');

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
    const { movie, person } = radio;
    const { searchMovie, searchPerson, api, sortBy } = config;
    try {
      const response = await fetch(
        `${config.baseUrl}${
          movie ? searchMovie : searchPerson
        }?api_key=${api}&query=${
          inputRef.current.value
        }&page=${page}&sort_by=${sortBy}`
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
    console.log(e.target.dataset.id);
  };

  const handleChange = (e) => {
    let copy = { ...radio };
    Object.keys(copy).forEach((key) => {
      copy[key] = false;
    });
    setRadio({ ...copy, [e.target.value]: true });
    setQueries(null);
  };

  return (
    <div className="p-6 text-4xl w-screen  bg-indigo-400 flex justify-center items-center flex-col">
      <div className="flex items-center pb-5">
        Movie
        <ChainIcon /> Chain
      </div>
      <form className="flex flex-col mx-5 " onSubmit={handleSearch}>
        <Choice onChange={handleChange} />
        <input
          placeholder="Search"
          className="w-full mt-5 rounded-xl px-4"
          ref={inputRef}
        />
        <button
          className="text-white"
          type="button"
          onClick={() => setQueries(null)}
        >
          clear
        </button>
      </form>
      <div
        className={
          radio.person
            ? 'grid grid-cols-3 sm:grid-cols-4 gap-5 px-5'
            : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-5'
        }
      >
        {radio.person && (
          <SearchPerson onClick={handleClick} queries={queries} />
        )}
        {radio.movie && <SearchMovie onClick={handleClick} queries={queries} />}
      </div>
    </div>
  );
};

export default App;
