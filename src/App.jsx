import React, { useState, useRef, useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieDetail from './components/Detail/MovieDetail';
import PersonDetail from './components/Detail/PersonDetail';
import Home from './components/Home';
import SearchMovie from './components/SearchResults/SearchMovie';
import SearchPerson from './components/SearchResults/SearchPerson';
import config from './config';
import { reducer, initialState } from './components/Functions/reducer';

const App = () => {
  const [queries, setQueries] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [radio, setRadio] = useState({ movie: true, person: false });

  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();
  const inputRef = useRef('');

  async function getQueries(page = 1) {
    let data = [];
    const { movie } = state.radio;
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
    const { movie } = state.radio;
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
    const { movie } = state.radio;
    e.preventDefault();
    try {
      await getQueries();
      movie ? navigate('/search-movie') : navigate('/search-person');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoice = async (e) => {
    const { movie } = state.radio;
    try {
      await getDetails(e.target.dataset.id);
      movie ? navigate('/movie-detail') : navigate('/person-detail');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    let copy = state.radio;
    Object.keys(copy).forEach((key) => {
      copy[key] = false;
    });
    dispatch({
      type: 'update',
      payload: { key: 'radio', value: { ...copy, [e.target.value]: true } },
    }),
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

  // console.log(state);
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
