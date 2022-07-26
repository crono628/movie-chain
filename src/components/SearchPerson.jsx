import React from 'react';
import NoPhotoIcon from './NoPhotoIcon';

const SearchPerson = ({ queries, onClick }) => {
  return (
    <>
      {queries?.map((query) => (
        <div
          onClick={onClick}
          key={query.id}
          className="w-full h-full text-sm m-2"
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
              className="flex max-h-56  border-2 items-center w-max mx-auto justify-center"
            >
              <NoPhotoIcon data={query.id} />
            </div>
          )}
          <div className="text-xl " data-id={query.id}>
            {query.name}
          </div>
          <div>
            <div className="text-sm  sm:text-base">
              <strong>Known for:</strong>
            </div>
            {query.known_for?.map((knownFor, index) => (
              <div className="text-xs sm:text-sm" key={knownFor.id}>
                <i>
                  {query?.known_for.length - 1 === index
                    ? knownFor.title || knownFor.name
                    : `${knownFor.title || knownFor.name}, `}
                </i>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SearchPerson;
