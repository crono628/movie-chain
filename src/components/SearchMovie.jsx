import React from 'react';
import NoPhotoIcon from './NoPhotoIcon';

const SearchMovie = ({ queries, onClick }) => {
  return (
    <>
      {queries?.map((query) => (
        <div
          onClick={onClick}
          key={query.id}
          className="w-full h-full text-sm m-2"
        >
          {query?.backdrop_path ? (
            <img
              id={query.id}
              src={`https://image.tmdb.org/t/p/w1280${query?.backdrop_path}`}
            />
          ) : (
            <div className="flex border-2 items-center w-max mx-auto justify-center">
              <NoPhotoIcon />
            </div>
          )}
          <div className="text-xl ">{query.title}</div>
        </div>
      ))}
    </>
  );
};

export default SearchMovie;
