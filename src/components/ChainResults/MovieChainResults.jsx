import React, { useState } from 'react';
import { useAppContext } from '../AppContext';

const MovieChainResults = () => {
  const { state, dispatch } = useAppContext();
  const { movieSelection1, movieSelection2 } = state;
  const [results, setResults] = useState([...combineSelections()]);

  console.log('results', results);

  function combineSelections() {
    let combined = [];
    combined.push(movieSelection1);
    combined.push(movieSelection2);
    return combined;
  }

  return <div>MovieChainResults</div>;
};

export default MovieChainResults;
