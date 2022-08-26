import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { combineObj } from '../Functions/combineCasts';

const MovieChainResults = () => {
  const { state, dispatch } = useAppContext();
  const { movieSelection1, movieSelection2 } = state;
  const [results, setResults] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (movieSelection1 && movieSelection2) {
      let combo = combineObj(movieSelection1.cast, movieSelection2.cast);
      let reduced = combo.reduce(
        (prev, curr) =>
          prev.find((a) => a.id === curr.id) ? prev : [...prev, curr],
        []
      );
      setResults(reduced);
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div>
      {results?.map((item, index) => {
        return (
          <div key={index}>
            {index + 1}. {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default MovieChainResults;
