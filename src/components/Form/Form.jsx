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
        </div>
      </div>
      <div className="w-full flex justify-center gap-3 py-2">
        <button
          onClick={onClick}
          type="reset"
          className="w-full   text-white bg-blue-900 border-0 py-1 px-6 focus:outline-none hover:bg-blue-800 rounded text-sm"
        >
          Reset
        </button>
        <button
          type="submit"
          className="w-full   text-white bg-blue-900 border-0 py-1 px-6 focus:outline-none hover:bg-blue-800 rounded text-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
});

export default Form;
