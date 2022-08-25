import React, { useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MovieDetail from './components/Detail/MovieDetail';
import PersonDetail from './components/Detail/PersonDetail';
import Home from './components/Home';
import SearchMovie from './components/SearchResults/SearchMovie';
import SearchPerson from './components/SearchResults/SearchPerson';
import Footer from './components/Footer';
import {
  getMovieDetailsCredits,
  getPersonDetailsCredits,
} from './components/Functions/getDetailsCredits';
import { useAppContext } from './components/AppContext';
import {
  getMovieQueries,
  getPersonQueries,
} from './components/Functions/getQueries';
import MovieChainResults from './components/ChainResults/MovieChainResults';

const App = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const inputRef = useRef('');

  const handleSubmit = async (e) => {
    const { radioMovie, page } = state;
    const searchVal = inputRef.current.value;
    dispatch({ type: 'update', payload: { key: 'loading', value: true } });
    e.preventDefault();
    try {
      radioMovie
        ? await getMovieQueries(searchVal, page).then((data) => {
            dispatch({
              type: 'update',
              payload: { key: 'searchMovieQueries', value: data },
            });
          })
        : await getPersonQueries(searchVal, page).then((data) => {
            dispatch({
              type: 'update',
              payload: { key: 'searchPersonQueries', value: data },
            });
          });
    } catch (error) {
      console.log(error);
    }
    radioMovie ? navigate('/search-movie') : navigate('/search-person');
    dispatch({ type: 'update', payload: { key: 'loading', value: false } });
  };

  const handleChoice = async (e) => {
    dispatch({ type: 'update', payload: { key: 'loading', value: true } });
    const { radioMovie } = state;
    try {
      radioMovie
        ? await getMovieDetailsCredits(e.target.dataset.id).then((data) => {
            const { dataDetails, dataCredits } = data;
            dispatch({
              type: 'update',
              payload: { key: 'movieDetails', value: dataDetails },
            });
            dispatch({
              type: 'update',
              payload: { key: 'movieCast', value: dataCredits },
            });
          })
        : await getPersonDetailsCredits(e.target.dataset.id).then((data) => {
            const { dataDetails, dataCredits } = data;
            dispatch({
              type: 'update',
              payload: { key: 'personCredits', value: dataCredits },
            });
            dispatch({
              type: 'update',
              payload: { key: 'personDetails', value: dataDetails },
            });
          });
      radioMovie ? navigate('/movie-detail') : navigate('/person-detail');
    } catch (error) {
      console.log(error);
    }
    dispatch({ type: 'update', payload: { key: 'loading', value: false } });
  };

  const handleChange = async (e) => {
    dispatch({
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
  };

  const handleMovieToPerson = (e) => {
    console.log(e.target.dataset.id);
    dispatch({
      type: 'update',
      payload: {
        key: 'loading',
        value: true,
      },
    });
    getPersonDetailsCredits(e.target.dataset.id).then((data) => {
      dispatch({
        type: 'update',
        payload: { key: 'personDetails', value: data.dataDetails },
      });
      dispatch({
        type: 'update',
        payload: { key: 'personCredits', value: data.dataCredits },
      });
    });
    navigate('/person-detail');
    dispatch({ type: 'update', payload: { key: 'loading', value: false } });
  };

  const handlePersonToMovie = (e) => {
    console.log(e.target.dataset.id);
    dispatch({
      type: 'update',
      payload: {
        key: 'loading',
        value: true,
      },
    });
    getMovieDetailsCredits(e.target.dataset.id).then((data) => {
      dispatch({
        type: 'update',
        payload: { key: 'movieDetails', value: data.dataDetails },
      });
      dispatch({
        type: 'update',
        payload: { key: 'movieCast', value: data.dataCredits },
      });
    });
    navigate('/movie-detail');
    dispatch({ type: 'update', payload: { key: 'loading', value: false } });
  };

  const handleValue = {
    handleSubmit,
    handleChoice,
    handleChange,
    handleClear,
  };

  // console.log(state);

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
              <SearchPerson
                queries={state.searchPersonQueries}
                onClick={handleChoice}
              />
            }
          />
          <Route
            path="/person-detail"
            element={<PersonDetail onClick={handlePersonToMovie} />}
          />
          <Route
            path="search-movie"
            element={
              <SearchMovie
                queries={state.searchMovieQueries}
                onClick={handleChoice}
              />
            }
          />
          <Route
            path="movie-detail"
            element={<MovieDetail onClick={handleMovieToPerson} />}
          />
          <Route path="movie-chain-results" element={<MovieChainResults />} />
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
