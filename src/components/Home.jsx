import React, { forwardRef } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import chain from '../assets/chain.svg';
import Form from './Form/Form';

const Home = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { handleChange, handleClear, handleSubmit } = props.value;

  return (
    <div className="p-6 text-4xl flex justify-center items-center flex-col">
      <div
        onClick={() => navigate('/')}
        className="flex items-center pb-5 cursor-pointer"
      >
        Movie <img style={{ height: 50 }} src={chain} alt="" /> Chain
      </div>
      <Form
        handleSubmit={handleSubmit}
        onChange={handleChange}
        onClick={handleClear}
        ref={ref}
      />
      <Outlet />
    </div>
  );
});

export default Home;
