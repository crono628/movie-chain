import React, { useEffect, useState } from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';
import { fixDate } from '../Functions/fixDate';
import { filterCastPopularity } from '../Functions/filterCastPopularity';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';

const MovieDetail = ({ onClick }) => {
  const { state, dispatch } = useAppContext();
  const { movieCast, loading, movieDetails } = state;
  const [cast, setCast] = useState();

  useEffect(() => {
    if (movieCast) {
      setCast(filterCastPopularity(movieCast.cast, 10));
    }
  }, [movieCast]);

  return (
    !loading &&
    movieCast &&
    movieDetails && (
      <>
        {movieDetails?.poster_path || movieDetails?.backdrop_path ? (
          <img
            className="w-1/3 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${
              movieDetails.poster_path || movieDetails.backdrop_path
            }`}
          />
        ) : (
          <div className=" w-1/4 h-1/4 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={movieDetails?.id} />
          </div>
        )}
        <div className="flex flex-col items-center max-w-lg">
          <div className="mt-5  text-4xl">{movieDetails?.title}</div>
          <div className="text-lg mb-3">"{movieDetails?.tagline}"</div>
          <div>
            <div className="text-sm sm:text-base mt-1 flex-1 text-center">
              {'Release Date: ' +
                `${
                  movieDetails.release_date
                    ? fixDate(movieDetails?.release_date)
                    : null
                }`}
            </div>
            <div className="text-lg my-5"> {movieDetails?.overview}</div>
            <div>Cast:</div>
            <div className="text-xl" onClick={onClick}>
              {cast?.map((actor, index) => (
                <span
                  className="cursor-pointer hover:bg-blue-500 hover:rounded-xl p-1 hover:p-1"
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
