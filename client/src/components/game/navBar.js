import React, { useState, useEffect } from 'react';

function NavBar() {
  const [username, setUsername] = useState('');

  // Use useEffect to update the username when the component mounts
  useEffect(() => {
    // Retrieve the username from local storage or an authentication context
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Guest'); // Default to 'Guest' if no username is found
  }, []);

  return (
    <div className='navBar-crd'>
      <div className='left-item'>
        <h1>Poker Game</h1>
      </div>

      <div className='right-item'>
        <h2>{username}</h2>
      </div>
    </div>
  );
}

export default NavBar;
