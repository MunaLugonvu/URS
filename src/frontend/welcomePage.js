import React from 'react';

const WelcomePage = ({ username }) => {
  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>This is your welcome page.</p>
    </div>
  );
};

export default WelcomePage;
