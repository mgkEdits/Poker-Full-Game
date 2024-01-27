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
  // const [discardPile, setDiscardPile] = useState([]);
  const [userTurn, setUserTurn] = useState(false);


  const handlePickCard=( )=>{
     const usrPickedCrd = availableCards.shift()
     setUserHand([...userHand,usrPickedCrd])
     console.log(usrPickedCrd, "user picked card")
     setTimeout(aiLogic,3000);
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

  const playCard = (card) => {
    const usrPlayedCrd = card
    console.log(usrPlayedCrd,'user played card');

    if (usrPlayedCrd.rank === displayedCard.rank ||usrPlayedCrd.suit === displayedCard.suit ){
      // setDiscardPile([...discardPile,displayedCard]);
      // console.log(displayedCard)
      setAvailableCards([...availableCards,displayedCard])
      setDisplayedCard(usrPlayedCrd);

      const updatedUserHand = userHand.filter(card => card !== usrPlayedCrd);
      setUserHand(updatedUserHand);

      console.log("its now ai`s turn") // Call the function for AI logic after a delay
      setTimeout(aiLogic,3000);
      //function for comp to play
    }else{
     
      alert("Pick another card")
    }
  };

  
  function isValidMove(aiCard) { 
    return aiCard.suit === displayedCard.suit || aiCard.rank === displayedCard.rank; 
   }
  
  const aiLogic = () =>{
    console.log(displayedCard, "previously displayed card")
    const validMoves = compHand.filter(isValidMove);
    console.log(validMoves, "valid moves")
    if (validMoves.length > 0) {
      const aiSelectedCrd = validMoves[Math.floor(Math.random() * validMoves.length)];
      // discardPile.push(selectedCard);
      console.log(aiSelectedCrd, "ai played card move")
      setAvailableCards([...availableCards,displayedCard])
      setDisplayedCard(aiSelectedCrd);

      const updatedCompHand = compHand.filter(card => card !== aiSelectedCrd);
      setCompHand(updatedCompHand);
    } else {
      // Computer draws a card
      const aiPickedCrd = availableCards.shift()
      setCompHand([...compHand,aiPickedCrd])
      console.log(aiPickedCrd, "ai picked card")
    }

    
      
    
    

  }

  // function checkForWinner() {
  //   if (playerHand.length === 0) {
  //     console.log('Player wins!');
  //   } else if (computerHand.length === 0) {
  //     console.log('Computer wins!');
  //   }
  // }

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
              <div  className='playCardDec-crd' key={index} onClick={() => playCard(card)}>
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
                  
                <p>{card.rank} </p> 
                <p>*{card.suit}* </p>
                  
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