import React from 'react';
import { useAppContext } from '../AppContext';
import { fixDate } from '../Functions/fixDate';

const MovieInfo = ({ cast, crew, onClick }) => {
  const { state } = useAppContext();
  const { movieDetails } = state;
  return (
    <div>
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
              className="cursor-pointer hover:bg-blue-800 hover:rounded p-1 hover:p-1"
              key={actor.id}
              data-id={actor.id}
            >
              {index === cast.length - 1 ? `${actor.name}` : `${actor.name}, `}
            </span>
          ))}
        </div>
        <div>Crew:</div>
        <div onClick={onClick}>
          <div className="text-base">
            {crew
              ?.filter((person) => person.job === 'Director')
              .map((person) => (
                <div
                  className="cursor-pointer hover:bg-blue-800 hover:rounded p-1 hover:p-1"
                  key={person.id}
                  data-id={person.id}
                >
                  {person.job} - {person.name}
                </div>
              ))}
          </div>
          <div className="text-base">
            {crew
              ?.filter((person) => person.job === 'Producer')
              .map((person) => (
                <div
                  className="cursor-pointer hover:bg-blue-800 hover:rounded p-1 hover:p-1"
                  key={person.id}
                  data-id={person.id}
                >
                  {person.job} - {person.name}
                </div>
              ))}
          </div>
          <div className="text-base">
            {crew
              ?.filter((person) => person.job === 'Executive Producer')
              .map((person) => (
                <div
                  className="cursor-pointer hover:bg-blue-800 hover:rounded p-1 hover:p-1"
                  key={person.id}
                  data-id={person.id}
                >
                  {person.job} - {person.name}
                </div>
              ))}
          </div>
          <div className="text-base">
            {crew
              ?.filter((person) => person.job === 'Writer')
              .map((person) => (
                <div
                  className="cursor-pointer hover:bg-blue-800 hover:rounded p-1 hover:p-1"
                  key={person.id}
                  data-id={person.id}
                >
                  {person.job} - {person.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
