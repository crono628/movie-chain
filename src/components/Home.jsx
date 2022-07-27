import React, { useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import ChainIcon from './ChainIcon';
import Form from './Form/Form';
import SearchMovie from './SearchResults/SearchMovie';
import SearchPerson from './SearchResults/SearchPerson';
import config from '../config';

const Home = ({ setForChoice, setChoice }) => {
  const [queries, setQueries] = useState(null);
  // const [forChoice, setForChoice] = useState(null);
  // const [choice, setChoice] = useState(null);
  const [radio, setRadio] = useState({ movie: true, person: false });
  const navigate = useNavigate();
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
      setForChoice(data);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/');
    setChoice(null);
    getQueries();
  };

  const handleChoice = (e) => {
    setChoice(e.target.dataset.id);
    setQueries(null);
    radio.movie ? navigate('/movie-detail') : navigate('/person-detail');
    // navigate(radio.movie ? 'movie-detail' : 'person-detail');
    // console.log(e.target.dataset.id);
  };

  const handleChange = (e) => {
    let copy = { ...radio };
    Object.keys(copy).forEach((key) => {
      copy[key] = false;
    });
    setRadio({ ...copy, [e.target.value]: true });
    handleClear();
  };

  const handleClear = async () => {
    navigate(`/`);
    setChoice(null);
    inputRef.current.value = '';
    setQueries(null);
  };

  return (
    <div className="p-6 text-4xl w-screen  bg-indigo-400 flex justify-center items-center flex-col">
      <div
        onClick={() => navigate('/')}
        className="flex items-center pb-5 cursor-pointer"
      >
        Movie
        <ChainIcon /> Chain
      </div>
      <Form
        path="/"
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
      <Outlet />
    </div>
  );
};

export default Home;
