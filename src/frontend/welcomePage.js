import React from 'react';
import "./welcomePage.css"

const WelcomePage = ({ username }) => {
  return (
    <>
     <div className='welcome'>
      <h2>Welcome, <span>{username}! </span></h2>
      <p>This is your welcome page.</p>
    </div></>
   
  );
};

export default WelcomePage;
