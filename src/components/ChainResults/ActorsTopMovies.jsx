import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { getPersonCredits } from '../Functions/getDetailsCredits';

const ActorsTopMovies = ({ arr }) => {
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
        console.log('call');
        let nums = arr?.map((item) => item.id);
        let mapCredits = nums?.map((num) => getPersonCredits(num));
        if (mapCredits === undefined) {
          return navigate('/');
        }

        Promise.all(mapCredits)
          .then((data) =>
            data
              .map((item) => item.cast.filter((item) => item.popularity > 40))
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

  return (
    <>
      {!loading && (
        <div>
          {currentRecommendations?.map((item, index) => {
            return (
              <div key={index}>
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
