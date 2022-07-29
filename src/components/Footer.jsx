import React from 'react';
import tmdb from '../assets/tmdb.svg';

const Footer = () => {
  return (
    <footer className="w-screen  bg-blue-900 px-4 py-2 h-12 ">
      <span className="flex items-center text-white justify-between text-xs">
        <div>MD © 2022</div>
        <div></div>
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Data and images provided by
          <img className="ml-2 w-36" src={tmdb} alt="tmdb logo" />
        </a>
      </span>
    </footer>
  );
};

export default Footer;
