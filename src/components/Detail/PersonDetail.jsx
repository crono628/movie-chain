import React, { useEffect, useRef, useState } from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';
import { useAppContext } from '../AppContext';
import { fixDate } from '../Functions/fixDate';

const PersonDetail = ({ onClick }) => {
  const { state } = useAppContext();
  const { personDetails, personCredits, loading } = state;
  const [hidden, setHidden] = useState({ bio: false });
  const [work, setWork] = useState([]);
  const bioRef = useRef();
  useEffect(() => {
    if (personCredits) {
      let work = personCredits.cast
        .filter((item) => item.media_type === 'movie')
        .sort((a, b) => b.popularity - a.popularity);
      setWork(work);
    }
  }, [personCredits, personDetails]);

  return !loading && personDetails && personCredits ? (
    <>
      {personDetails?.profile_path ? (
        // person photo
        <img
          className="w-1/2 sm:w-1/4 rounded mt-7"
          src={`https://image.tmdb.org/t/p/w1280${personDetails?.profile_path}`}
        />
      ) : (
        <div className=" w-1/3 rounded  mx-auto my-12">
          <NoPhotoIcon data={personDetails?.id} />
        </div>
      )}
      <div className="w-7/12">
        <div>
          <div className="text-xl mt-7">
            {/* person details */}
            <div>
              <span className="font-bold">Name:</span> {personDetails?.name}
            </div>
            <div>
              <span className="font-bold">Birthday:</span>{' '}
              {personDetails?.birthday
                ? fixDate(personDetails?.birthday)
                : 'N/A'}
            </div>
            <div>
              <span className="font-bold">Place of Birth:</span>{' '}
              {personDetails?.place_of_birth
                ? personDetails.place_of_birth
                : 'N/A'}
            </div>
            <div>
              <span
                onClick={() => setHidden({ ...hidden, bio: !hidden.bio })}
                className="font-bold"
              >
                Biography:
                {hidden.bio ? (
                  <span className="font-normal text-xs"> (click to hide)</span>
                ) : (
                  <span className="font-normal text-xs"> (click to show)</span>
                )}
              </span>{' '}
              <div>
                {hidden.bio && (
                  <span ref={bioRef}>
                    {personDetails?.biography
                      ? personDetails?.biography
                      : 'N/A'}
                  </span>
                )}
              </div>
              {hidden.bio ? (
                <div
                  className="text-xs"
                  onClick={() => setHidden({ ...hidden, bio: !hidden.bio })}
                >
                  (click to hide bio)
                </div>
              ) : null}
            </div>
            <div>
              <span className="font-bold">Known For:</span>{' '}
              <div>
                {work.map((item, index) => {
                  if (index < 20) {
                    return (
                      <div
                        data-id={item.id}
                        key={item.id + index}
                        onClick={onClick}
                        className="cursor-pointer hover:bg-blue-800 hover:rounded p-1 hover:p-1"
                      >
                        {item.release_date
                          ? `${fixDate(item.release_date)} - `
                          : ''}
                        {item.title}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>There's nothing here!</div>
  );
};

export default PersonDetail;
