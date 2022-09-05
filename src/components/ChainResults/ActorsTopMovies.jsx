import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import {
  getMovieDetailsCredits,
  getPersonCredits,
} from '../Functions/getDetailsCredits';

const ActorsTopMovies = ({ arr }) => {
  const { state, dispatch } = useAppContext();
  const { currentRecommendations, loading } = state;
  const [showLinks, setShowLinks] = useState(false);
  const [links, setLinks] = useState([]);
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
        let nums = arr?.map((item) => ({ id: item.id, name: item.name }));
        let mapCredits = nums?.map(async (num) => ({
          actor: num.name,
          credits: await getPersonCredits(num.id),
        }));

        if (mapCredits === undefined) {
          return navigate('/');
        }
        console.log('call');

        Promise.all(mapCredits)
          .then((data) => {
            return data.map((item) => ({
              actor: item.actor,
              movies: item.credits.cast
                .filter((item) => item.popularity > 5)
                .sort((a, b) => b.popularity - a.popularity),
            }));
          })
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
      for (let j = 0; j < arr[i].movies.length; j++) {
        result.push({
          actor: arr[i].actor,
          movie: arr[i].movies[j].title,
          popularity: arr[i].movies[j].popularity,
          id: arr[i].movies[j].id,
        });
      }
    }

    let final = result.reduce((acc, curr) => {
      let x = acc.find((item) => item.id === curr.id);
      if (!x) {
        acc.push({
          movie: curr.movie,
          id: curr.id,
          popularity: curr.popularity,
          links: [],
        });
      }
      acc.find((item) => item.id === curr.id).links.push(curr.actor);
      return acc;
    }, []);

    final.sort((a, b) => b.popularity - a.popularity);

    return final;
  }

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

  const handleThing = (e) => {
    let num = e.currentTarget.dataset.movie;
    const obj = currentRecommendations.find((item) => {
      return item.id == num;
    });
    setLinks(obj.links);
    setShowLinks(true);
    console.log('obj', obj.links);
  };

  return (
    <>
      {!loading && (
        <div className="text-lg">
          {currentRecommendations?.map((item, index) => {
            return (
              <div
                // onClick={handleNextMovie}
                onClick={handleThing}
                data-movie={item.id}
                key={item.id}
                className="cursor-pointer hover:bg-blue-500 hover:rounded-xl p-1 hover:p-1"
              >
                <div>{item.movie}</div>
              </div>
            );
          })}
        </div>
      )}
      <div className={showLinks ? overlayStyle : overlayStyle + ' hidden'}>
        <div className={showLinks ? modalStyle : modalStyle + ' hidden'}>
          <div className="relative">
            <div className="left-0 mb-2 text-2xl">
              {links.length < 2 ? 'Movie Chain Link' : 'Movie Chain Links'}
            </div>
            <button
              className="absolute right-0 top-0"
              onClick={() => setShowLinks(false)}
            >
              x
            </button>
            <div className="overflow-y-scroll max-h-40 ">
              {links.map((item) => {
                return (
                  <div key={item} className=" text-base  ">
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const overlayStyle =
  'text-black fixed z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60';
const modalStyle =
  'max-h-60 fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-md px-8 py-6 space-y-5 drop-shadow-lg ';
export default ActorsTopMovies;
