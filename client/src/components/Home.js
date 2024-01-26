import React from 'react'
import axios from 'axios';

const handleNewGame= (e) => {
  e.preventDefault();
  window.location.href = '/PokerGame';
};

const handleViewScores= (e) => {
  e.preventDefault();
  window.location.href = '/Standing-Score';
  axios.get('http://localhost:5555/scores/<int:id>')
//       .then(response => {
//         setDisplayedCard(response.data.displayed_card);
//         setUserTurn(true);
//       })
//       .catch(error => {
//         console.error('Error starting the game:', error);
//       });
};

const handleLogOut= (e) => {
  e.preventDefault();
  window.location.href = '/';
};


// /*---------------------------------lohic to initiali*/
//   const [displayedCard, setDisplayedCard] = useState(null);
//   const [userHand, setUserHand] = useState([]);
//   const [compHand, setCompHand] = useState([]);
//   const [availableCards, setAvailableCards] = useState([]);
//   const [userTurn, setUserTurn] = useState(false);

//   useEffect(() => {
//     axios.get('http://localhost:5555/deck')
//       .then(response => {
//         const deck = response.data.deck;
//         setDisplayedCard(deck.pop()); // Set the displayed card from the top of the deck
//         setUserHand([...deck.slice(0, 4)]); // Initial user hand (4 cards)
//         setCompHand([...deck.slice(4, 8)]); // Initial comp hand (4 cards)
//         setAvailableCards([...deck.slice(8)]); // Remaining cards for available cards
//         setUserTurn(true);
//       })
//       .catch(error => {
//         console.error('Error fetching deck:', error);
//       });
//   }, []);

//   const startGame = () => {
//     axios.get('http://localhost:5555/start_game')
//       .then(response => {
//         setDisplayedCard(response.data.displayed_card);
//         setUserTurn(true);
//       })
//       .catch(error => {
//         console.error('Error starting the game:', error);
//       });
//   };

//   const playCard = (cardIndex) => {
//     // Implement the logic to play a card
//     // Update the 'userTurn', 'displayedCard', 'userHand', 'compHand', and 'availableCards' state accordingly
//     // Make a POST request to '/play_card' endpoint on the Flask server
//   };
function Home() {
  return (
    <div className='home-wrp'>
       <div className='right-sqr'>
       <div className='title-sqr'>
       <h1> Poker Game </h1>
       </div>
      </div>

      <div className='left-sqr'>
        <button  onClick={handleNewGame}>New Game</button>
        <button  onClick={handleViewScores}>View Scores</button>
        <button  onClick={handleLogOut}> Log Out</button>
      </div>
    </div>
  )
}

export default Home