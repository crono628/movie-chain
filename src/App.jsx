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
import { getPersonDetailsCredits } from './components/Functions/getDetailsCredits';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const inputRef = useRef('');

  async function getQueries() {
    let data = [];
    const { radioMovie } = state;
    const { searchMovie, searchPerson, api, sortBy, baseUrl } = config;
    try {
      const response = await fetch(
        `${baseUrl}${
          radioMovie ? searchMovie : searchPerson
        }?api_key=${api}&query=${inputRef.current.value}&page=${
          state.page
        }&sort_by=${sortBy}`
      );
      const responseData = await response.json();
      data = responseData?.results;
      dispatch({ type: 'update', payload: { key: 'queries', value: data } });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    const { radioMovie } = state;
    e.preventDefault();
    try {
      await getQueries();
      radioMovie ? navigate('/search-movie') : navigate('/search-person');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChoice = async (e) => {
    const { radioMovie } = state;
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
      radioMovie ? navigate('/movie-detail') : navigate('/person-detail');
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'update', payload: { key: 'loading', value: false } });
  };

  const handleChange = async (e) => {
    return dispatch({
      type: 'update',
      payload: {
        key: 'radioMovie',
        value: !state.radioMovie,
      },
    });
  };

  const handleClear = () => {
    navigate(`/`);
    inputRef.current.value = '';
    dispatch({ type: 'clear' });
    console.log(state);
  };

  const handleMovieToPerson = (e) => {
    console.log(e.target.dataset.id);
    dispatch({
      type: 'update',
      payload: {
        key: 'radioMovie',
        value: !state.radioMovie,
      },
    });
    getPersonDetailsCredits(e.target.dataset.id).then((data) => {
      console.log(data);
      dispatch({
        type: 'update',
        payload: { key: 'details', value: data.dataDetails },
      });
      dispatch({
        type: 'update',
        payload: { key: 'credits', value: data.dataCredits },
      });
    });
    navigate('/person-detail');
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
          <Route
            path="movie-detail"
            element={
              <MovieDetail onClick={handleMovieToPerson} value={state} />
            }
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
      <Footer />
    </div>
  );
};

export default App;
