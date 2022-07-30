import React, { useEffect } from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';
import { useAppContext } from '../AppContext';

const PersonDetail = () => {
  const { state } = useAppContext();
  const { personDetails, personCredits, loading } = state;

  useEffect(() => {
    if (personDetails) {
      console.log('personDetails', personDetails);
      console.log('personCredits', personCredits);
    }
  }, [personDetails]);

  return (
    !loading &&
    personDetails !== null && (
      <>
        {personDetails?.profile_path ? (
          <img
            className="w-1/4 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${personDetails?.profile_path}`}
          />
        ) : (
          <div className=" w-1/3 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={queries?.id} />
          </div>
        )}
        <div className="mt-5 my-3 text-4xl">{personDetails?.name}</div>
        <div className="my-3 text-2xl">
          {personDetails.place_of_birth
            ? `Born: ${personDetails.place_of_birth}`
            : null}
        </div>
        <div className="my-3 text-xl">{personDetails.biography}</div>
      </>
    )
  );
};

export default PersonDetail;
