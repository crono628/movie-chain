import React from 'react';
import NoPhotoIcon from './NoPhotoIcon';

const SearchMovie = ({ queries, onClick }) => {
  return (
    <div className="p-3 text-4xl flex justify-center items-center flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
        {queries?.map((query) => (
          <div
            key={query.id}
            onClick={onClick}
            className="text-sm m-2 flex flex-col border-2 rounded cursor-pointer"
          >
            {query?.backdrop_path || query.poster_path ? (
              <img
                className="rounded"
                data-id={query.id}
                src={`https://image.tmdb.org/t/p/w1280${
                  query.poster_path || query.backdrop_path
                }`}
              />
            ) : (
              <div data-id={query.id} className="flex-1  rounded  mx-auto">
                <NoPhotoIcon data={query.id} />
              </div>
            )}
            <div className="text-base p-2">{query.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovie;
