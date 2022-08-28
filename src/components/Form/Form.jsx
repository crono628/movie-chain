import React, { forwardRef } from 'react';
import Choice from './Choice';

const Form = forwardRef((props, ref) => {
  const { onChange, handleSubmit, onClick } = props;

  return (
    <form className="flex flex-col mx-5 h-56" onSubmit={handleSubmit}>
      {/* <Choice onChange={onChange} /> */}
      <input
        placeholder="Search"
        className="w-full mt-5 rounded-xl px-4"
        ref={ref}
      />
      <button
        className="text-white hover:bg-blue-600  mx-auto w-fit mt-2  rounded-xl p-2"
        type="reset"
        onClick={onClick}
      >
        reset
      </button>
    </form>
  );
});

export default Form;
