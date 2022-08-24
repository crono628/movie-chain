import React, { forwardRef } from 'react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import chain from '../assets/chain.svg';
import { useAppContext } from './AppContext';
import Form from './Form/Form';

const Home = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { movieSelection1, movieSelection2 } = state;
  const { handleChange, handleClear, handleSubmit } = props.value;
  const titleClasses = ' flex items-center pb-5 cursor-pointer';

  useEffect(() => {
    if (movieSelection1 && movieSelection2) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    }
  }, [movieSelection1, movieSelection2]);

  return (
    <div className="p-6 text-4xl flex justify-center items-center flex-col">
      <div
        onClick={null}
        className={
          movieSelection1 && movieSelection2
            ? 'pulsate' + titleClasses
            : titleClasses
        }
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
