import React from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';

const PersonDetail = ({ value }) => {
  const { details, queries, loading } = value;

  return (
    !loading &&
    details !== null && (
      <>
        {details?.profile_path ? (
          <img
            className="w-1/4 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${details?.profile_path}`}
          />
        ) : (
          <div className=" w-1/3 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={queries?.id} />
          </div>
        )}
        <div className="mt-5 my-3 text-4xl">{details?.name}</div>
        <div className="my-3 text-2xl">
          {details.place_of_birth ? `Born: ${details.place_of_birth}` : null}
        </div>
        <div className="my-3 text-xl">{details.biography}</div>
      </>
    )
  );
};

export default PersonDetail;
