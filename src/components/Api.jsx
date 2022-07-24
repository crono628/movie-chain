import React from 'react';

const Api = ({ handleClick }) => {
  return (
    <div className="w-fit flex bg-yellow-500" onClick={handleClick}>
      Api
    </div>
  );
};

export default Api;
