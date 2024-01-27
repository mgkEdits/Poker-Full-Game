import './game.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from './navBar'
import NavCenter from './navCenter'

function HomeLayout() {
  let discardPile = [];
  // const [playedCard, setPlayedCard] = useState([]);
  // const [gameCard, setGameCard] = useState([]);

  const [displayedCard, setDisplayedCard] = useState(null);
  const [userHand, setUserHand] = useState([]);
  const [compHand, setCompHand] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  const [userTurn, setUserTurn] = useState(false);

  const handlePickCard=( )=>{
     const usrPickedCrd = availableCards.shift()
     setUserHand([...userHand,usrPickedCrd])
     setTimeout(aiLogic(),3000);
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

  const playCard = (cardIndex,card) => {
    const usrPlayedCrd = card
    console.log(usrPlayedCrd);

    if (usrPlayedCrd.rank === displayedCard.rank ||usrPlayedCrd.suit === displayedCard.suit ){
      console.log("correct card")
      setAvailableCards([...availableCards,displayedCard])
      setDisplayedCard(usrPlayedCrd);
      console.log("its now ai`s turn") ///create alert for user
      setTimeout(aiLogic(),3000);
      //function for comp to play
    }else{
      console.log("wrong Card card")
      alert("Pick another card")
      console.log(availableCards)
    }
  };

  const aiLogic = () =>{

    // function isValidMove(aicard) { 
    //   const topCard = discardPile[discardPile.length – 1];
    //    return card.suit === topCard.suit || card.rank === topCard.rank; 
    //   }
      
    // compHand.forEach( compCrd => {
    //   if (compCrd.rank === displayedCard.rank ||compCrd.suit === displayedCard.suit ){
    //     console.log("correct card")
    //     setAvailableCards([...availableCards,displayedCard])
    //     setDisplayedCard(compCrd);
    //     console.log("its now your turn")   // create alert for user
    //   } 
      
    // });

    // if (condition) {
      
    // } else{
    //   //logic for ai to pick card 
    //   const aiPickedCrd = availableCards.shift()
    //   setCompHand([...compHand,aiPickedCrd])
    //   console.log("its now your turn")   // create alert for user
    // }

  }

  function checkForWinner() {
    if (playerHand.length === 0) {
      console.log('Player wins!');
    } else if (computerHand.length === 0) {
      console.log('Computer wins!');
    }
  }

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
              <div  className='playCardDec-crd' key={index} onClick={() => playCard(index,card)}>
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