import React from 'react'

const handleNewGame= (e) => {
  e.preventDefault();
  window.location.href = '/PokerGame';
};


const handleLogOut= (e) => {
  e.preventDefault();
  window.location.href = '/';
};

const userName = "user"; // pick user variable from cookie
const gamesWon = 0;
const gamesLost = 0;

function ViewScores() {
  return (
    
    <div className='home-wrp'>
       <div className='right-sqr'>
       <div className='title-sqr'>
       <h1> Poker Game </h1>
       </div>
       <div className='score-sqr'>
        <h3 className='url'> {userName} Score History</h3>
        <h4> Game Won: {gamesWon}</h4>
        <h4> Game Won: {gamesLost}</h4>
    </div>
      </div>

      <div className='left-sqr'>
        <button  onClick={handleNewGame}>New Game</button>
        <button className='active'>View Scores</button>
        <button  onClick={handleLogOut}> Log Out</button>
      </div>
    </div>
  )
}

export default ViewScores