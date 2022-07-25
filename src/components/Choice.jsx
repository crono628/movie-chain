import React from 'react';

const Choice = ({ onChange }) => {
  return (
    <div>
      <fieldset className="border border-solid border-gray-300 p-3 flex flex-col">
        <legend className="text-base">Choose</legend>
        <div className="flex justify-around ">
          <div>
            <label htmlFor="movie">Movie</label>
            <input
              onChange={onChange}
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-3 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
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
              className="appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-3 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="radio"
              name="choice"
              id="person"
              value="person"
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default Choice;
