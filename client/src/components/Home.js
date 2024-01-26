import React from 'react'

const newGame = 0;
const viewScores = 0;
const logOut = 0;

function Home() {
  return (
    <div>
       <div className='right-sqr'>
       <h1> Poker Game </h1>
        </div>

      <div className='left-sqr'>
        <button onClick={newGame}>New Game</button>
        <button onClick={viewScores}>View Scores</button>
        <button onClick={logOut}> Log Out</button>
      </div>
    </div>
  )
}

export default Home