import React, { useEffect, useRef, useState } from 'react';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';
import { useAppContext } from '../AppContext';
import { fixDate } from '../Functions/fixDate';

const PersonDetail = () => {
  const { state } = useAppContext();
  console.log(state);
  const { personDetails, personCredits, loading } = state;
  const [hidden, setHidden] = useState({ bio: false });
  const bioRef = useRef();
  useEffect(() => {
    if (personDetails) {
      // console.log('personDetails', personDetails);
      // console.log('personCredits', personCredits);
    }
  }, [personDetails]);

  return (
    !loading &&
    personDetails !== null && (
      <>
        {personDetails?.profile_path ? (
          <img
            className="w-1/2 sm:w-1/4 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${personDetails?.profile_path}`}
          />
        ) : (
          <div className=" w-1/3 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={queries?.id} />
          </div>
        )}
        <ul className="w-7/12">
          <li>
            <ul className="text-xl mt-7">
              <li>
                <span className="font-bold">Name:</span> {personDetails?.name}
              </li>
              <li>
                <span className="font-bold">Birthday:</span>{' '}
                {personDetails?.birthday
                  ? fixDate(personDetails?.birthday)
                  : 'N/A'}
              </li>
              <li>
                <span className="font-bold">Place of Birth:</span>{' '}
                {personDetails?.place_of_birth
                  ? personDetails.place_of_birth
                  : 'N/A'}
              </li>
              <li>
                <span
                  onClick={() => {
                    setHidden({ ...hidden, bio: !hidden.bio });
                  }}
                  className="font-bold"
                >
                  Biography:
                  {hidden.bio ? (
                    <span className="text-xs"> (click to hide)</span>
                  ) : (
                    <span className="text-xs"> (click to show)</span>
                  )}
                </span>{' '}
                {hidden.bio && (
                  <span ref={bioRef}>
                    {personDetails?.biography
                      ? personDetails?.biography
                      : 'N/A'}
                  </span>
                )}
              </li>
              <li>
                <span className="font-bold">Known For:</span>{' '}
                <ul>
                  {personCredits?.cast
                    .sort((a, b) => b.popularity - a.popularity)
                    .map((item, index) => {
                      if (index < 20) {
                        console.log(item.release_date);
                        return (
                          <li key={item.id}>
                            {item.title}(
                            {item.release_date
                              ? fixDate(item.release_date)
                              : null}
                            )
                          </li>
                        );
                      }
                    })}
                </ul>
              </li>
            </ul>
          </li>

          {/* <ul
            className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
            id="tabs-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <div
                onClick={() => {
                  myRef.current.scrollIntoView({ behavior: 'smooth' });
                }}
                href="#tabs-home"
                className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    "
                id="tabs-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#tabs-home"
                role="tab"
                aria-controls="tabs-home"
                aria-selected="true"
              >
                Home
              </div>
            </li>
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-profile"
                className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
                id="tabs-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#tabs-profile"
                role="tab"
                aria-controls="tabs-profile"
                aria-selected="false"
              >
                Profile
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-messages"
                className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
                id="tabs-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#tabs-messages"
                role="tab"
                aria-controls="tabs-messages"
                aria-selected="false"
              >
                Messages
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                href="#tabs-contact"
                className="
      nav-link
      disabled
      pointer-events-none
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
                id="tabs-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#tabs-contact"
                role="tab"
                aria-controls="tabs-contact"
                aria-selected="false"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="tab-content mt-96" id="tabs-tabContent">
            <div
              ref={myRef}
              className="tab-pane fade show active"
              id="tabs-home"
              role="tabpanel"
              aria-labelledby="tabs-home-tab"
            >
              Tab 1 content
            </div>
            <div
              className="tab-pane fade"
              id="tabs-profile"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab"
            >
              Tab 2 content
            </div>
            <div
              className="tab-pane fade"
              id="tabs-messages"
              role="tabpanel"
              aria-labelledby="tabs-profile-tab"
            >
              Tab 3 content
            </div>
            <div
              className="tab-pane fade"
              id="tabs-contact"
              role="tabpanel"
              aria-labelledby="tabs-contact-tab"
            >
              Tab 4 content
            </div>
          </div> */}

          {/* <li>
            <ul className="text-xl mt-7">
              <li>
                <ul className="font-bold">Known For:</ul>{' '}
                {personCredits?.cast.length > 0
                  ? personCredits?.cast.map((item) => {
                      return (
                        <li key={item.id}>
                          {item.release_date
                            ? fixDate(item.release_date)
                            : null}{' '}
                          {item.title}
                        </li>
                      );
                    })
                  : 'N/A'}
              </li>
            </ul>
          </li> */}
        </ul>
      </>
    )
  );
};

export default PersonDetail;
