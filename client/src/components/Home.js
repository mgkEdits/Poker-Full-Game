import React from 'react'

function Home() {

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

  return (
    <div className='home-wrp'>
       <div className='right-sqr'>
       <div className='title-sqr'>
       <h1> Poker Game </h1>
       </div>
      </div>

      <div className='left-sqr'>
        <button  onClick={handleNewGame}>New Game</button>
        <button  onClick={handleViewScores} >View Scores</button>
        <button  onClick={handleLogOut}> Log Out</button>
      </div>
    </div>
  )
}

export default Home