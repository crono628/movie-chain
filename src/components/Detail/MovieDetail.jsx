import React, { useEffect, useState } from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';
import { fixDate } from '../Functions/fixDate';
import { filterCastPopularity } from '../Functions/filterCastPopularity';
import { useNavigate } from 'react-router-dom';

const MovieDetail = ({ value, onClick }) => {
  const { details, loading, credits } = value;
  const [cast, setCast] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (credits) {
      setCast(filterCastPopularity(credits.cast, 10));
    }
  }, [credits]);

  return (
    !loading && (
      <>
        {details?.poster_path || details?.backdrop_path ? (
          <img
            className="w-1/3 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${
              details.poster_path || details.backdrop_path
            }`}
          />
        ) : (
          <div className=" w-1/4 h-1/4 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={details?.id} />
          </div>
        )}
        <div className="flex flex-col items-center max-w-lg">
          <div className="mt-5  text-4xl">{details?.title}</div>
          <div className="text-lg mb-3">"{details?.tagline}"</div>
          <div>
            <div className="text-sm sm:text-base mt-1 flex-1 text-center">
              {'Release Date: ' + fixDate(details?.release_date)}
            </div>
            <div className="text-lg my-5"> {details?.overview}</div>
            <div>Cast:</div>
            <div className="text-xl" onClick={onClick}>
              {cast.map((actor, index) => (
                <span
                  className="cursor-pointer"
                  key={actor.id}
                  data-id={actor.id}
                >
                  {index === cast.length - 1
                    ? `${actor.name}`
                    : `${actor.name}, `}
                </span>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default MovieDetail;
