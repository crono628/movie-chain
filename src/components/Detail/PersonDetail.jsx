import React, { useEffect, useState } from 'react';
import config from '../../config';
import NoPhotoIcon from '../SearchResults/NoPhotoIcon';

const PersonDetail = ({ choice, queries }) => {
  const [person, setPerson] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    let dataArr = [];
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${config.baseUrl}person/${choice}?api_key=${config.api}`
        );
        const data = await response.json();
        dataArr = data;
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setPerson(dataArr);
    };
    return () => fetchData();
  }, [choice, queries]);

  useEffect(() => {
    if (queries) {
      queries.map((query) => {
        if (query.id == choice) {
          setInfo(query);
        }
      });
    }
  }, [choice, queries]);

  return (
    !loading && (
      <>
        {info?.profile_path ? (
          <img
            className="w-1/4 rounded-xl mt-7"
            src={`https://image.tmdb.org/t/p/w1280${info?.profile_path}`}
          />
        ) : (
          <div className=" w-1/4 h-1/4 rounded-xl  mx-auto my-12">
            <NoPhotoIcon data={info?.id} />
          </div>
        )}
        <div className="mt-5 my-3 text-4xl">{person.name}</div>
        <div>
          <div className="text-sm sm:text-base mt-1 flex-1 text-center">
            <strong>Known for:</strong>
          </div>
          <div>
            {info?.known_for.map((knownFor, index) => (
              <div className="text-xs sm:text-sm" key={knownFor.id}>
                <i>
                  {info?.known_for.length - 1 === index
                    ? knownFor.title || knownFor.name
                    : `${knownFor.title || knownFor.name}, `}
                </i>
              </div>
            ))}
          </div>
        </div>
        <div className="my-3 text-2xl">
          {person.place_of_birth ? `Born: ${person.place_of_birth}` : null}
        </div>
        <div className="my-3 text-xl">{person.biography}</div>
      </>
    )
  );
};

export default PersonDetail;
