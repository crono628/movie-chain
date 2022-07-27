import React, { forwardRef } from 'react';
import Choice from './Choice';

const Form = forwardRef((props, ref) => {
  const { onChange, onSubmit, onClick } = props;
  return (
    <form className="flex flex-col mx-5 h-56" onSubmit={onSubmit}>
      <Choice onChange={onChange} />
      <input
        placeholder="Search"
        className="w-full mt-5 rounded-xl px-4"
        ref={ref}
      />
      <button className="text-white" type="button" onClick={onClick}>
        clear
      </button>
    </form>
  );
});

export default Form;
