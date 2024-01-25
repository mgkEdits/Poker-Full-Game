import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GamePage = () => {
  const [displayedCard, setDisplayedCard] = useState(null);
  const [userHand, setUserHand] = useState([]);
  const [compHand, setCompHand] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [userTurn, setUserTurn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5555/deck')
      .then(response => {
        const deck = response.data.deck;
        setDisplayedCard(deck.pop()); // Set the displayed card from the top of the deck
        setUserHand([...deck.slice(0, 4)]); // Initial user hand (4 cards)
        setCompHand([...deck.slice(4, 8)]); // Initial comp hand (4 cards)
        setAvailableCards([...deck.slice(8)]); // Remaining cards for available cards
        setUserTurn(true);
      })
      .catch(error => {
        console.error('Error fetching deck:', error);
      });
  }, []);

  const startGame = () => {
    axios.get('http://localhost:5555/start_game')
      .then(response => {
        setDisplayedCard(response.data.displayed_card);
        setUserTurn(true);
      })
      .catch(error => {
        console.error('Error starting the game:', error);
      });
  };

  const playCard = (cardIndex) => {
    // Implement the logic to play a card
    // Update the 'userTurn', 'displayedCard', 'userHand', 'compHand', and 'availableCards' state accordingly
    // Make a POST request to '/play_card' endpoint on the Flask server
  };

  return (
    <div>
      <h1>Poker Game</h1>
      {displayedCard && (
        <div>
          <h2>Displayed Card</h2>
          <p>{displayedCard.rank} of {displayedCard.suit}</p>
        </div>
      )}
      {userTurn && (
        <div>
          <h2>Your Hand</h2>
          {userHand.map((card, index) => (
            <button key={index} onClick={() => playCard(index)}>
              {card.rank} of {card.suit}
            </button>
          ))}
        </div>
      )}
      <div>
        <h2>Available Cards</h2>
        <ul>
          {availableCards.map((card, index) => (
            <li key={index}>Hidden Card</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={startGame}>Start Game</button>
      </div>
    </div>
  );
};

export default GamePage;
