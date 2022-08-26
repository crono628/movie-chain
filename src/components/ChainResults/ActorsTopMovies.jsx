import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getPersonCredits } from '../Functions/getDetailsCredits';

const ActorsTopMovies = ({ arr }) => {
  const [people, setPeople] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getThing() {
      if (arr) {
        let nums = arr?.map((item) => item.id);
        let mapCredits = nums?.map((num) => getPersonCredits(num));
        Promise.all(mapCredits)
          .then((data) =>
            data
              .map((item) => item.cast.filter((item) => item.popularity > 50))
              .map((array) => array.sort((a, b) => b.popularity - a.popularity))
          )
          .then((final) => setData(final));
      }
    }

    getThing();
  }, [arr]);
  console.log('data', condenseData(data));

  function condenseData(array) {
    let newArray = array.map((item) => {
      return item.reduce((acc, curr) => {
        if (!acc.includes(curr.title)) {
          acc.push(curr);
        }
        return acc;
      }, []);
    });

    let finalArray = newArray
      .flat()
      .sort((a, b) => b.popularity - a.popularity)
      .reduce((acc, curr) => {
        let key = 'title';
        if (!acc.some((item) => item[key] === curr[key])) {
          acc.push(curr);
        }

        return acc;
      }, []);

    return finalArray;
  }

  return (
    <div>
      HERE
      {/* {data?.map((movie, index) => {
        return movie.map((titles) => <div key={index}>{titles.title}</div>);
      })} */}
    </div>
  );
};

export default ActorsTopMovies;
