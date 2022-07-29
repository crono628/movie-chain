import React, { useRef, useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieDetail from './components/Detail/MovieDetail';
import PersonDetail from './components/Detail/PersonDetail';
import Home from './components/Home';
import SearchMovie from './components/SearchResults/SearchMovie';
import SearchPerson from './components/SearchResults/SearchPerson';
import config from './config';
import { reducer, initialState } from './components/Functions/reducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const inputRef = useRef('');

  async function getQueries() {
    let data = [];
    const { movie } = state.radio;
    const { searchMovie, searchPerson, api, sortBy, baseUrl } = config;
    try {
      const response = await fetch(
        `${baseUrl}${movie ? searchMovie : searchPerson}?api_key=${api}&query=${
          inputRef.current.value
        }&page=${state.page}&sort_by=${sortBy}`
      );
      const responseData = await response.json();
      data = responseData?.results;
      dispatch({ type: 'update', payload: { key: 'queries', value: data } });
    } catch (error) {
      console.log(error);
    }
  }

  async function getDetails(choice) {
    const { movie } = state.radio;
    const { api, baseUrl } = config;
    dispatch({ type: 'update', payload: { key: 'loading', value: true } });
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
    dispatch({ type: 'update', payload: { key: 'details', value: dataArr } });
    dispatch({ type: 'update', payload: { key: 'loading', value: false } });
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
    let copy = { ...state.radio };
    Object.keys(copy).forEach((key) => {
      copy[key] = false;
    });
    dispatch({
      type: 'update',
      payload: { key: 'radio', value: { ...copy, [e.target.value]: true } },
    });
  };

  const handleClear = () => {
    navigate(`/`);
    inputRef.current.value = '';
    dispatch({ type: 'clear' });
    console.log(state);
  };

  const handleValue = {
    handleSubmit,
    handleChoice,
    handleChange,
    handleClear,
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
          element={
            <SearchPerson queries={state.queries} onClick={handleChoice} />
          }
        />
        <Route path="/person-detail" element={<PersonDetail value={state} />} />
        <Route
          path="search-movie"
          element={
            <SearchMovie queries={state.queries} onClick={handleChoice} />
          }
        />
        <Route path="movie-detail" element={<MovieDetail value={state} />} />
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
