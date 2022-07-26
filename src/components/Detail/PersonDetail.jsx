import React, { useEffect, useState } from 'react';
import config from '../../config';

const PersonDetail = ({ choice }) => {
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (choice) {
      const fetchData = async () => {
        const response = await fetch(
          `${config.baseUrl}person/${choice}?api_key=${config.api}`
        );
        const data = await response.json();
        setPerson(data);
        setLoading(false);
      };
      return () => fetchData();
    } else {
      setLoading(true);
    }
  }, [choice]);
  // console.log('person', person);
  return (
    !loading && (
      <>
        <div className="mt-5 my-3 text-4xl">{person.name}</div>
        <div className="my-3 text-3xl">{person.birthday}</div>
        <div className="my-3 text-2xl">{person.place_of_birth}</div>
        <div className="my-3 text-xl">{person.biography}</div>
      </>
    )
  );
};

export default PersonDetail;
