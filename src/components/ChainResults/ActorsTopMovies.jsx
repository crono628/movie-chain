import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getPersonCredits } from '../Functions/getDetailsCredits';

const ActorsTopMovies = ({ arr }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getThing() {
      if (arr) {
        let nums = arr?.map((item) => item.id);
        let mapCredits = nums?.map((num) => getPersonCredits(num));
        Promise.all(mapCredits)
          .then((data) =>
            data
              .map((item) => item.cast.filter((item) => item.popularity > 40))
              .map((array) => array.sort((a, b) => b.popularity - a.popularity))
          )
          .then((final) => {
            let finalData = filteredTitles(final);
            setData(finalData);
          });
      }
    }

    getThing();
  }, [arr]);
  console.log('data', data);

  // console.log('arr', filteredTitles(data));

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
    <div>
      {data.map((item, index) => {
        return (
          <div key={index}>
            <h2>{item?.title}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default ActorsTopMovies;
