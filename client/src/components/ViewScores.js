import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';

const ViewScores = () => {

  // Retrieve username from local storage or state
  const activeUsername = localStorage.getItem('username') || 'example';
  const [gamesWon, setGamesWon] = useState(0);
  const [gamesLost, setGamesLost] = useState(0);
  
  const handleNewGame= (e) => {
    e.preventDefault();
    window.location.href = '/PokerGame'; // implementing passing props
  };

const handleLogOut= (e) => {
  e.preventDefault();
  window.location.href = '/';
};

useEffect(() => {
  axios.get('http://localhost:5555/scores')
    .then(response => {
      const allUserData = response.data.scores;
      console.log(allUserData)
      console.log(activeUsername)
      const userData = allUserData.filter(user => user.username === activeUsername);

      // Use userData as needed
      console.log(userData);
      // Calculate games won and lost
      let wonCount = 0;
      let lostCount = 0;

      userData.forEach(user => {
        if (user.result === 1) {
          wonCount += 1;
        } else {
          lostCount += 1;
        }
      });
      setGamesWon(wonCount);
      setGamesLost(lostCount);

    })
    .catch(error => {
      console.error('Error fetching Users:', error);
    });
}, [activeUsername]);


  return (
    
    <div className='home-wrp'>
       <div className='right-sqr'>
       <div className='title-sqr'>
       <h1> Poker Game </h1>
       </div>
       <div className='score-sqr'>
        <h3 className='url'> {activeUsername} Score History</h3>
        <h4> Game Won: {gamesWon}</h4>
        <h4> Game Lost: {gamesLost}</h4>
    </div>
      </div>

      <div className='left-sqr'>
        <button  onClick={handleNewGame}  >Start New Game</button>
        <button className='active'>View Scores</button>
        <button  onClick={handleLogOut}> Log Out</button>
      </div>
    </div>
  )
}

export default ViewScores