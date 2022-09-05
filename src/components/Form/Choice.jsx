import React from 'react';

const Choice = ({ onChange }) => {
  return (
    <>
      <div className="text-sm pb-2 flex justify-start text-center">
        <div className="mr-8">
          <label htmlFor="movie">Movie</label>
          <input
            onChange={onChange}
            className="ml-2"
            type="radio"
            name="choice"
            id="movie"
            value="movie"
            defaultChecked
          />
        </div>
        <div>
          <label htmlFor="person">Person</label>
          <input
            onChange={onChange}
            className="ml-2"
            type="radio"
            name="choice"
            id="person"
            value="person"
          />
        </div>
      </div>
    </>
  );
};

export default Choice;
