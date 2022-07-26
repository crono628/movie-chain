import React, { useRef, useState } from 'react';
import SearchPerson from './components/SearchResults/SearchPerson';
import ChainIcon from './components/ChainIcon';
import SearchMovie from './components/SearchResults/SearchMovie';
import Form from './components/Form/Form';
import config from './config';

const App = () => {
  const [queries, setQueries] = useState([]);
  const [choice, setChoice] = useState({});
  const [radio, setRadio] = useState({ movie: true, person: false });
  const inputRef = useRef('');

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

  const handleChoice = (e) => {
    console.log(e.target.dataset.id);
  };

  const handleChange = (e) => {
    let copy = { ...radio };
    Object.keys(copy).forEach((key) => {
      copy[key] = false;
    });
    setRadio({ ...copy, [e.target.value]: true });
    handleClear();
  };

  const handleClear = () => {
    inputRef.current.value = '';
    setQueries(null);
  };

  return (
    <div className="p-6 text-4xl w-screen  bg-indigo-400 flex justify-center items-center flex-col">
      <div className="flex items-center pb-5">
        Movie
        <ChainIcon /> Chain
      </div>
      <Form
        onSubmit={handleSearch}
        onChange={handleChange}
        onClick={handleClear}
        ref={inputRef}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
        {radio.person && (
          <SearchPerson onClick={handleChoice} queries={queries} />
        )}
        {radio.movie && (
          <SearchMovie onClick={handleChoice} queries={queries} />
        )}
      </div>
    </div>
  );
};

export default App;
