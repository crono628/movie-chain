import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import {
  getMovieDetailsCredits,
  getPersonCredits,
} from '../Functions/getDetailsCredits';

const ActorsTopMovies = ({ arr }) => {
  console.log('arr', arr);

  const { state, dispatch } = useAppContext();
  const { currentRecommendations, loading } = state;
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: 'update',
      payload: {
        key: 'loading',
        value: true,
      },
    });
    async function getThing() {
      if (arr && !currentRecommendations) {
        let nums = arr?.map((item) => item.id);
        let mapCredits = nums?.map((num) => getPersonCredits(num));
        if (mapCredits === undefined) {
          return navigate('/');
        }
        console.log('call');

        Promise.all(mapCredits)
          .then((data) =>
            data
              .map((item) => item.cast.filter((item) => item.popularity > 20))
              .map((array) => array.sort((a, b) => b.popularity - a.popularity))
          )
          .then((final) => {
            let finalData = filteredTitles(final);
            dispatch({
              type: 'update',
              payload: {
                key: 'currentRecommendations',
                value: finalData,
              },
            });
          });
      }
      dispatch({
        type: 'update',
        payload: {
          key: 'loading',
          value: false,
        },
      });
    }

    getThing();
  }, [currentRecommendations, arr]);

  function filteredTitles(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        result.push(arr[i][j]);
      }
    }

    const filtered = result.reduce((acc, curr) => {
      const x = acc.find((item) => item.title === curr.title);
      if (!x) {
        return acc.concat([curr]);
      }
      return acc;
    }, []);
    return filtered;
  }
  // console.log('curr', currentRecommendations);

  const handleNextMovie = async (e) => {
    dispatch({ type: 'clear' });
    dispatch({
      type: 'set_multiple',
      payload: {
        loading: true,
        currentRecommendations: null,
      },
    });
    try {
      await getMovieDetailsCredits(e.currentTarget.dataset.movie).then(
        (data) => {
          const { dataDetails, dataCredits } = data;
          dispatch({
            type: 'update',
            payload: { key: 'movieDetails', value: dataDetails },
          });
          dispatch({
            type: 'update',
            payload: { key: 'movieCast', value: dataCredits },
          });
        }
      );
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: 'update',
      payload: {
        key: 'loading',
        value: false,
      },
    });
  };

  return (
    <>
      {!loading && (
        <div className="text-lg">
          {currentRecommendations?.map((item) => {
            return (
              <div
                onClick={handleNextMovie}
                data-movie={item.id}
                key={item.id}
                className="cursor-pointer hover:bg-blue-500 hover:rounded-xl p-1 hover:p-1"
              >
                <h2>{item?.title}</h2>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ActorsTopMovies;
