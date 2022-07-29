import React, { useRef, useReducer } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieDetail from './components/Detail/MovieDetail';
import PersonDetail from './components/Detail/PersonDetail';
import Home from './components/Home';
import SearchMovie from './components/SearchResults/SearchMovie';
import SearchPerson from './components/SearchResults/SearchPerson';
import config from './config';
import {
  reducer,
  initialState,
  getDetailsAndCredits,
} from './components/Functions/reducer';
import Footer from './components/Footer';

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
    dispatch({ type: 'update', payload: { key: 'loading', value: true } });

    try {
      await getDetailsAndCredits(e.target.dataset.id, state).then((data) => {
        dispatch({
          type: 'update',
          payload: { key: 'details', value: data.dataDetails },
        });
        dispatch({
          type: 'update',
          payload: { key: 'credits', value: data.dataCredits },
        });
      });
      movie ? navigate('/movie-detail') : navigate('/person-detail');
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'update', payload: { key: 'loading', value: false } });
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

  console.log(state);

  return (
    <div className="mx-auto max-w-screen-lg flex flex-col h-screen justify-between ">
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
          <Route
            path="/person-detail"
            element={<PersonDetail value={state} />}
          />
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
      <Footer />
    </div>
  );
};

export default App;
