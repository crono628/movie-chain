import React from 'react';
import { Outlet } from 'react-router-dom';
import NoPhotoIcon from './NoPhotoIcon';

const SearchPerson = ({ queries, onClick }) => {
  return (
    <div className="p-3 text-4xl  flex justify-center items-center flex-col">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
        {queries?.map((query) => (
          <div
            onClick={onClick}
            key={query.id}
            className="text-sm m-2 flex flex-col border-2 rounded-xl"
          >
            {query.profile_path ? (
              <img
                className="rounded-xl"
                data-id={query.id}
                src={`https://image.tmdb.org/t/p/w1280${query?.profile_path}`}
              />
            ) : (
              <div
                data-id={query.id}
                className="flex-1 h-full rounded-xl  mx-auto"
              >
                <NoPhotoIcon data={query.id} />
              </div>
            )}
            <div className="text-lg p-2 " data-id={query.id}>
              {query.name}
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default SearchPerson;
