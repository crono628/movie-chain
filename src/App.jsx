import React, { useState, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieDetail from './components/Detail/MovieDetail';
import PersonDetail from './components/Detail/PersonDetail';
import Home from './components/Home';
import SearchMovie from './components/SearchResults/SearchMovie';
import SearchPerson from './components/SearchResults/SearchPerson';
import config from './config';

const App = () => {
  const [queries, setQueries] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [radio, setRadio] = useState({ movie: true, person: false });
  const navigate = useNavigate();
  const inputRef = useRef('');

  async function getQueries(page = 1) {
    let data = [];
    const { movie } = radio;
    const { searchMovie, searchPerson, api, sortBy, baseUrl } = config;
    try {
      const response = await fetch(
        `${baseUrl}${movie ? searchMovie : searchPerson}?api_key=${api}&query=${
          inputRef.current.value
        }&page=${page}&sort_by=${sortBy}`
      );
      const responseData = await response.json();
      data = responseData?.results;
      setQueries(data);
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  }

  async function getDetails(choice) {
    const { movie } = radio;
    const { api, baseUrl } = config;
    setLoading(true);
    let dataArr = [];
    try {
      const response = await fetch(
        `${baseUrl}${movie ? 'movie' : 'person'}/${choice}?api_key=${api}`
      );
      const data = await response.json();
      dataArr = data;
    } catch (error) {
      console.log(error);
    }
    setDetails(dataArr);
    setLoading(false);
    // console.log(dataArr);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await getQueries();
      radio.movie ? navigate('/search-movie') : navigate('/search-person');
    } catch {
      console.log('error');
    }
  };

  const handleChoice = async (e) => {
    try {
      await getDetails(e.target.dataset.id);
      radio.movie ? navigate('/movie-detail') : navigate('/person-detail');
    } catch {
      console.log('error');
    }
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
    navigate(`/`);
    inputRef.current.value = '';
    setQueries(null);
  };

  const handleValue = {
    handleSubmit,
    handleChoice,
    handleChange,
    handleClear,
  };

  const detailValue = {
    details,
    loading,
    queries,
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<Home ref={inputRef} value={handleValue} />}
      >
        <Route
          path="/search-person"
          element={<SearchPerson queries={queries} onClick={handleChoice} />}
        />
        <Route
          path="/person-detail"
          element={<PersonDetail value={detailValue} />}
        />
        <Route
          path="search-movie"
          element={<SearchMovie queries={queries} onClick={handleChoice} />}
        />
        <Route
          path="movie-detail"
          element={<MovieDetail value={detailValue} />}
        />
        <Route
          path="*"
          element={
            <div style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
