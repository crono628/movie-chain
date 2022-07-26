import React from 'react';
import NoPhotoIcon from './NoPhotoIcon';

const SearchMovie = ({ queries, onClick }) => {
  return (
    <>
      {queries?.map((query) => (
        <div
          key={query.id}
          onClick={onClick}
          className="text-sm m-2 flex flex-col border-2 rounded-xl"
        >
          {query?.backdrop_path || query.poster_path ? (
            <img
              className="rounded-xl"
              data-id={query.id}
              src={`https://image.tmdb.org/t/p/w1280${
                query.poster_path || query.backdrop_path
              }`}
            />
          ) : (
            <div data-id={query.id} className="flex-1  rounded-xl  mx-auto">
              <NoPhotoIcon data={query.id} />
            </div>
          )}
          <div className="text-base p-2">{query.title}</div>
        </div>
      ))}
    </>
  );
};

export default SearchMovie;
