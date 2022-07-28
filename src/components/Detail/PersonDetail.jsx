import React from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';

const PersonDetail = ({ value }) => {
  const { details, queries, loading } = value;
  // console.log(details);
  // console.log(queries);
  let known = queries.find((item) => item.id === details.id);

  return (
    loading === false && (
      <>
        {details?.profile_path ? (
          <img
            className="w-1/4 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${details?.profile_path}`}
          />
        ) : (
          <div className=" w-1/4 h-1/4 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={queries?.id} />
          </div>
        )}
        <div className="mt-5 my-3 text-4xl">{details.name}</div>
        <div>
          {/* <div className="text-sm sm:text-base mt-1 flex-1 text-center">
            <strong>Known for:</strong>
          </div>
          <div>
            {known?.known_for?.map((knownFor, index) => (
              <div className="text-xs sm:text-sm" key={knownFor.id}>
                <i>
                  {queries?.known_for.length - 1 === index
                    ? knownFor.title || knownFor.name
                    : `${knownFor.title || knownFor.name}, `}
                </i>
              </div>
            ))}
          </div> */}
        </div>
        <div className="my-3 text-2xl">
          {details.place_of_birth ? `Born: ${details.place_of_birth}` : null}
        </div>
        <div className="my-3 text-xl">{details.biography}</div>
      </>
    )
  );
};

export default PersonDetail;
