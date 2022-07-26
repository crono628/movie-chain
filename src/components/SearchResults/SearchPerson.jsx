import React from 'react';
import NoPhotoIcon from './NoPhotoIcon';

const SearchPerson = ({ queries, onClick }) => {
  return (
    <>
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
          {/* <Disclosure.Panel>
            <div className="text-sm sm:text-base mt-1 flex-1">
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
          </Disclosure.Panel> */}
        </div>
      ))}
    </>
  );
};

export default SearchPerson;
