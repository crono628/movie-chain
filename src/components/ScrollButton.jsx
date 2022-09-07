import React, { useEffect, useState } from 'react';

const ScrollButton = ({ below }) => {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (below) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.pageYOffset > below) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <button
      className={`${
        show ? 'animate-btnIn ' : loaded ? 'animate-btnOut ' : 'hidden'
      }  w-20 z-50 sticky bottom-16 ml-auto mb-5 mr-5  bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full`}
      onClick={handleClick}
      onAnimationEnd={() => setLoaded(true)}
    >
      Top
    </button>
  );
};

export default ScrollButton;
