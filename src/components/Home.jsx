import React, { forwardRef, useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import chain from '../assets/chain.svg';
import { useAppContext } from './AppContext';
import Form from './Form/Form';

const Home = forwardRef((props, ref) => {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { movieSelection1, movieSelection2 } = state;
  const { handleChange, handleClear, handleSubmit } = props.value;
  const titleClasses = 'title flex items-center pb-5';
  const trigger = !!movieSelection1 && !!movieSelection2;

  useEffect(() => {
    if (trigger) {
      setReady(true);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    } else {
      setReady(false);
    }
  }, [movieSelection1, movieSelection2]);

  const handleResults = () => {
    if (trigger) {
      navigate('/movie-chain-results');
      setReady(false);
    }
  };

  return (
    <div className="px-2 pt-4 text-4xl flex justify-center items-center flex-col">
      <div
        onClick={handleResults}
        className={ready ? 'pulsate' + titleClasses : titleClasses}
      >
        Movie <img style={{ height: 50 }} src={chain} alt="" /> Chain
      </div>
      {/* <div className="flex justify-evenly text-center h-16 text-sm sm:text-xl w-full">
        <div>{movieSelection1?.title}</div> {trigger && '+'}
        <div>{movieSelection2?.title}</div>
      </div> */}
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
