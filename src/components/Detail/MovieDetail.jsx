import React, { useEffect, useState } from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';
import { filterCastPopularity } from '../Functions/filterCastPopularity';
import { useAppContext } from '../AppContext';
import ActorsTopMovies from '../ChainResults/ActorsTopMovies';
import MovieInfo from '../Info/MovieInfo';

const MovieDetail = ({ onClick }) => {
  const { state, dispatch } = useAppContext();
  const { movieCast, loading, movieDetails, movieSelection1, movieSelection2 } =
    state;
  const [cast, setCast] = useState();
  const [crew, setCrew] = useState();
  const [showRecommendations, setShowRecommendations] = useState(true);
  // const trigger = !!movieSelection1 && !!movieSelection2;

  useEffect(() => {
    if (movieCast) {
      let jobs = movieCast?.crew.reduce((acc, curr) => {
        if (
          curr.job === 'Director' ||
          curr.job === 'Producer' ||
          curr.job === 'Writer' ||
          curr.job === 'Executive Producer'
        ) {
          acc.push(curr);
        }
        return acc;
      }, []);
      setCast(filterCastPopularity(movieCast.cast, 5));
      setCrew(jobs);
    }
  }, [movieCast]);

  const handleAdd = () => {
    console.log('movie1', movieSelection1);
    dispatch({
      type: 'update',
      payload: {
        key: movieSelection1 === null ? 'movieSelection1' : 'movieSelection2',
        value: {
          title: movieDetails.title,
          id: movieDetails.id,
          cast: filterCastPopularity(movieCast.cast, 5),
        },
      },
    });
  };

  return !loading && movieCast && movieDetails ? (
    <>
      {/* this is an undeveloped idea that compares
    two movies. worth revisiting */}
      {/* <button
        className="text-white hover:bg-blue-600  mx-auto w-fit mt-2  rounded-xl p-2"
        onClick={handleAdd}
        disabled={trigger}
      >
        add
      </button> */}

      {movieDetails?.poster_path || movieDetails?.backdrop_path ? (
        <img
          className="w-1/2 sm:w-1/3 rounded-xl "
          src={`https://image.tmdb.org/t/p/w1280${
            movieDetails.poster_path || movieDetails.backdrop_path
          }`}
        />
      ) : (
        <div className=" w-1/4 h-1/4 rounded-xl  mx-auto my-12">
          <NoPhotoIcon data={movieDetails?.id} />
        </div>
      )}
      <div className="flex flex-col items-center w-full">
        <div className="mt-5  text-4xl">{movieDetails?.title}</div>
        {movieDetails?.tagline && (
          <div className="text-lg mb-3">"{movieDetails?.tagline}"</div>
        )}
        <div className="flex justify-around text-sm sm:text-lg w-full my-6 relative">
          <button
            className={
              showRecommendations ? 'bg-blue-500 p-2 rounded-lg' : 'p-2'
            }
            onClick={() => setShowRecommendations(true)}
          >
            Recommendations
          </button>
          <button
            className={
              !showRecommendations ? 'bg-blue-500 p-2 rounded-lg' : 'p-2'
            }
            onClick={() => setShowRecommendations(false)}
          >
            Movie info
          </button>
        </div>
        {!showRecommendations && (
          <MovieInfo cast={cast} crew={crew} onClick={onClick} />
        )}
        {showRecommendations && <ActorsTopMovies arr={cast} />}
      </div>
    </>
  ) : (
    <div></div>
  );
};

export default MovieDetail;
