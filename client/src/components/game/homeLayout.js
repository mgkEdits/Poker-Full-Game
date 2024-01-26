import './game.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from './navBar'
import NavCenter from './navCenter'

function HomeLayout() {
  // const [playedCard, setPlayedCard] = useState([]);
  // const [gameCard, setGameCard] = useState([]);

  const [displayedCard, setDisplayedCard] = useState(null);
  const [userHand, setUserHand] = useState([]);
  const [compHand, setCompHand] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [userTurn, setUserTurn] = useState(false);

  const handlePickCard=( )=>{
    axios.get('http://127.0.0.1:5555/draw')
      .then(response =>{
        const pickedCard = response.data;
        setUserHand([userHand.push(pickedCard)]); //add picked card to user hand destructively
      })
        // availableCards
  }
  console.log(availableCards);

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

  // const startGame = () => {
  //   axios.get('http://localhost:5555/start_game')
  //     .then(response => {
  //       setDisplayedCard(response.data.displayed_card);
  //       setUserTurn(true);
  //     })
  //     .catch(error => {
  //       console.error('Error starting the game:', error);
  //     });
  // };

  const playCard = (cardIndex) => {
     axios.get('http://localhost:5555/start_game')
    // Implement the logic to play a card
    // Update the 'userTurn', 'displayedCard', 'userHand', 'compHand', and 'availableCards' state accordingly
    // Make a POST request to '/play_card' endpoint on the Flask server
  };

  return (
    <div className='homeLayout-crd'>
      <NavBar  /* ----------------------------add username as prop from Cookie  -----------------*/ />  
      <NavCenter  /*-----------------------   add games won Prop for Running   -----------------------------------*/ />
      
      <div className='crd-wrap'/*-------  User Cards Section  ---------*/>
        <div className='userDec-crd'>
        <h2>Your Hand</h2>
        {userTurn && (
          <div className='userDec-crrd'>
            
            {userHand.map((card, index) => (
              <div  className='playCardDec-crd' key={index} onClick={() => playCard(index)}>
                <p>{card.rank} </p> 
                <p>*{card.suit}* </p>
              </div>
            ))}
          </div>
        )}
     </div>
        <div className='crd-shell'>
            <div className='cardDec-crd'  onClick={handlePickCard}/*-------  Pick Cards Section  ---------*/ > 
            <h2>Pick Card</h2>
            </div>

            <div className='gamedec-crd' /*-------  Game Table Section  ---------*/>
              <p>Game Table </p>
                <div className='crdd-wrp'>
                <div className='crd-crd'/*-------  Played Card Section  ---------*/>
                <h2>Played Card</h2>
                </div>
                
                <div className='crd-crd'/*-------  Game Card Section  ---------*/>
                {displayedCard && (
                  <div>
                    <h2>Game Card</h2>
                    <p>{displayedCard.rank} </p>
                    <p> **{displayedCard.suit}**</p>
                  </div>
                )}
                </div>
        
                </div>
            </div>
        </div>
        <div className='pcDec-crd' /*-------  pc Cards Section  ---------*/>
          <h2>pc Cards</h2>
          {userTurn && (
            <div className='userDec-crrd'>
              
              {compHand.map((card, index) => (
                <div  className='playCardDec-crd' key={index} onClick={() => playCard(index)}>
                  
                  <p>**</p> 
                  <p>***</p> 
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='btn'>
        <button>Quit Game</button>
      </div>
    </div>
  )
}

export default HomeLayout