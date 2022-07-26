import React, { useEffect } from 'react';

const MovieDetail = () => {
  useEffect(() => {
    if (choice) {
      getMovie();
    }
  }, []);

  return <div>MovieDetail</div>;
};

export default MovieDetail;
