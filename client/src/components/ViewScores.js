import React, { useEffect, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { gameScoresState } from './atoms'; // Adjust the path as needed

const ViewScores = () => {
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username') || 'user';

  const setGameScores = useSetRecoilState(gameScoresState);
  const { gamesWon, gamesLost } = useRecoilValue(gameScoresState);

  const fetchScores = async () => {
    try {
      const url = `http://localhost:5555/scores?username=${username}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      let wonCount = 0;
      let lostCount = 0;

      data.scores.forEach((score) => {
        if (score.result === 1) {
          wonCount++;
        } else if (score.result === 0) {
          lostCount++;
        }
      });

      setGameScores({ gamesWon: wonCount, gamesLost: lostCount });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  useEffect(() => {
    // Call the fetchScores function when the component mounts
    fetchScores();
  }, []); // The empty dependency array ensures that the effect runs only once on mount

  const handleNewGame = (e) => {
    e.preventDefault();
    window.location.href = '/PokerGame';
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    window.location.href = '/';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-wrp">
      <div className="right-sqr">
        <div className="title-sqr">
          <h1> Poker Game </h1>
        </div>
        <div className="score-sqr">
          <h3 className="url"> {username} Score History</h3>
          <h4> Games Won: {gamesWon}</h4>
          <h4> Games Lost: {gamesLost}</h4>
        </div>
      </div>

      <div className="left-sqr">
        <button onClick={handleNewGame}>New Game</button>
        <button className="active">View Scores</button>
        <button onClick={handleLogOut}> Log Out</button>
      </div>
    </div>
  );
};

export default ViewScores;
