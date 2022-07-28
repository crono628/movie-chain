import React, { useEffect, useState } from 'react';
import config from '../../config';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';

const MovieDetail = ({ value }) => {
  const { details, queries, loading } = value;
  return (
    !loading && (
      <>
        {details?.poster_path || details?.backdrop_path ? (
          <img
            className="w-1/4 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${
              details.poster_path || details.backdrop_path
            }`}
          />
        ) : (
          <div className=" w-1/4 h-1/4 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={details?.id} />
          </div>
        )}
        <div className="mt-5 my-3 text-4xl">{details.title}</div>
        <div>
          <div className="text-sm sm:text-base mt-1 flex-1 text-center">
            {details.release_date}
          </div>
          <div className="text-lg mt-5"> {details.overview}</div>
        </div>
      </>
    )
  );
};

export default MovieDetail;
