import React, { forwardRef } from 'react';
import Choice from './Choice';

const Form = forwardRef((props, ref) => {
  const { onChange, handleSubmit, onClick } = props;

  return (
    <form className="flex flex-col mx-5 mb-10" onSubmit={handleSubmit}>
      {/* <Choice onChange={onChange} /> */}
      <div className="flex relative ">
        <div className="flex relative">
          <input
            type="text"
            placeholder="Search for a movie"
            ref={ref}
            id="search"
            name="search"
            className="w-full bg-white rounded text-base text-gray-700 py-1 px-3"
          />
          <button
            type="submit"
            className=" ml-2  text-white bg-blue-900 border-0 py-3 px-6 focus:outline-none hover:bg-blue-800 rounded text-sm"
          >
            Search
          </button>
        </div>
      </div>
      <button
        className="text-white text-base mt-2 px-4 bg-blue-900 hover:bg-blue-800  mx-auto w-fit rounded p-2"
        type="reset"
        onClick={onClick}
      >
        Reset
      </button>
    </form>
  );
});

export default Form;
