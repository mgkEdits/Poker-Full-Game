import React from 'react'
import HomeLayout from './game/homeLayout'

const handleNewGame= (e) => {
  e.preventDefault();
  window.location.href = '/PokerGame';
};

const handleViewScores= (e) => {
  e.preventDefault();
  window.location.href = '/Standing-Score';
};

const handleLogOut= (e) => {
  e.preventDefault();
  window.location.href = '/';
};

function Home() {
  return (
    <div>
       <div className='right-sqr'>
       <h1> Poker Game </h1>
        </div>

      <div className='left-sqr'>
        <button onClick={handleNewGame}>New Game</button>
        <button onClick={handleViewScores}>View Scores</button>
        <button onClick={handleLogOut}> Log Out</button>
      </div>
    </div>
  )
}

export default Home