import React from 'react';
import Svg from './svg';

const SearchPerson = ({ queries, onClick }) => {
  return (
    <>
      {queries?.map((query) => (
        <div
          onClick={onClick}
          key={query.id}
          className="w-full h-full text-sm m-2"
        >
          {query?.profile_path ? (
            <img
              id={query.id}
              src={`https://image.tmdb.org/t/p/w1280${query?.profile_path}`}
            />
          ) : (
            <div className="flex border-2 items-center w-max mx-auto justify-center">
              <Svg />
            </div>
          )}
          <div className="text-xl">{query.name}</div>
          <div>
            <div className="text-lg">Known for:</div>
            {query.known_for?.map((knownFor) => (
              <div key={knownFor.id}>{knownFor.title}</div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchPerson;
