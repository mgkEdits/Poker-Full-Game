import React from 'react'

const gamesLost = 0;
const userName = 0;
const gamesWon = 0;

function ViewScores() {
  return (
    <div className='right-sqr'>
        <h3> {userName} Score History</h3>
        <h4> Game Won: {gamesWon}</h4>
        <h4> Game Won: {gamesLost}</h4>
    </div>
  )
}

export default ViewScores