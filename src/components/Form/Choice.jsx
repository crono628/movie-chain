import React from 'react';

const Choice = ({ onChange }) => {
  return (
    <>
      <fieldset className="border border-solid border-gray-300 p-3 flex flex-col rounded-xl text-xl sm:text-4xl">
        <legend className="text-base text-white w-min">Search</legend>
        <div className="flex justify-around text-center">
          <div>
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
      </fieldset>
    </>
  );
};

export default Choice;
