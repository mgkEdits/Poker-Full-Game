import './game.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import NavBar from './navBar'
import NavCenter from './navCenter'

function HomeLayout() {

   let crtTopCard = [];
   
  // const [crtTopCard, setPlayedCard] = useState([]);
  // const [gameCard, setGameCard] = useState([]);

  const [displayedCard, setDisplayedCard] = useState(null);
  const [userHand, setUserHand] = useState([]);
  const [compHand, setCompHand] = useState([]);
  const [availableCards, setAvailableCards] = useState([]);
  // const [discardPile, setDiscardPile] = useState([]);
  // const [userTurn, setUserTurn] = useState(false);


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
        // setUserTurn(true);
      })
      .catch(error => {
        console.error('Error fetching deck:', error);
      });
  }, []);
    
    // crtTopCard.unshift(displayedCard)
    // console.log(crtTopCard,"array of previous game cards")
    let newTopCard = [...crtTopCard,displayedCard]
    console.log(newTopCard,"array of previous game cards")
    const crtTopCrd = newTopCard[newTopCard.length-1]
    // const crtTopCrd = crtTopCard[0]
    console.log(crtTopCrd,'top card on index 0');

  const playCard = (card) => {
    const usrPlayedCrd = card
    console.log(usrPlayedCrd,'user played card');

    if (usrPlayedCrd.rank === crtTopCrd.rank ||usrPlayedCrd.suit === crtTopCrd.suit ){
      // setDiscardPile([...discardPile,displayedCard]);
      // console.log(displayedCard)
      // setAvailableCards([...availableCards,displayedCard])
      
      setDisplayedCard(usrPlayedCrd);
      crtTopCard.push([usrPlayedCrd])
      handleeSpecialCardRules(usrPlayedCrd); //passing penalty to pc
      console.log(crtTopCard,"new displayed card")

      const updatedUserHand = userHand.filter(card => card !== usrPlayedCrd);
      setUserHand(updatedUserHand);

      setTimeout(checkForWinner,2000);

      console.log("its now ai`s turn") // Call the function for AI logic after a delay
      setTimeout(aiLogic,3000);
      //function for comp to play
    }else{
     
      alert("Pick another card")
    }
    
  };

  
  function isValidMove(aiCard) { 
    return aiCard.suit === crtTopCrd.suit || aiCard.rank === crtTopCrd.rank; 
   }

   function handleSpecialCardRules(card) {
    switch (card.rank) {
      case '2':
        handlePenalty(2);
        break;
      case '3':
        handlePenalty(3);
        break;
    }
  }

  function handleeSpecialCardRules(card) {
    switch (card.rank) {
      case '2':
        handleePenalty(2);
        break;
      case '3':
        handleePenalty(3);
        break;
    }
  }

  function handleePenalty(count) { 

    setCompHand(prevCompHand => {
      const updatedCompHand = [...prevCompHand];
      for (let i = 0; i < count; i++) {
        const drawnCard = availableCards.shift();
        updatedCompHand.push(drawnCard);
        console.log('AI draws penalty card:', drawnCard);
      }
      return updatedCompHand;
    });
  //   for (let i = 0; i < count; i++) {
  //     const drawnCard = availableCards.shift()
  //     setCompHand([...compHand,drawnCard])
  //     console.log('AI draws penalty card:', drawnCard);
  //     console.log(compHand)
  //   }
  }

  function handlePenalty(count) {

    setUserHand(prevUserHand => {
      const updatedUserHand = [...prevUserHand];
      for (let i = 0; i < count; i++) {
        const drawnCard = availableCards.shift();
        updatedUserHand.push(drawnCard);
        console.log('Player draws penalty card:', drawnCard);
      }
      return updatedUserHand;
    });
    // for (let i = 0; i < count; i++) {
    //   const drawnCard = availableCards.shift()
    //   setUserHand([...userHand,drawnCard])
    //   console.log('Player draws penalty card:', drawnCard);
    //   console.log(userHand)
    // }
  }

  const dropCard = (cardsToDrop) => {
    const aiSelectedCrd = cardsToDrop[Math.floor(Math.random() * cardsToDrop.length)];
    console.log(aiSelectedCrd, "ai played card move");
  
    // setAvailableCards([...availableCards, displayedCard]);
    // crtTopCard.push([aiSelectedCrd])
    setDisplayedCard(aiSelectedCrd);
    handleSpecialCardRules(aiSelectedCrd);
  
    const updatedCompHand = compHand.filter(card => card !== aiSelectedCrd);
    setCompHand(updatedCompHand);
    setTimeout(checkForWinner,2000);
  };

  const getCardRankValue = (rank) => {
    const rankValues = {
      'Ace': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      '10': 10,
      'Queen': 11
      // Add more ranks as needed
    };
  
    return rankValues[rank] || 0;
  };
  
  //computer logic for game continuity
  const aiLogic = () =>{
    console.log(crtTopCrd, "previously displayed card")
    const validMoves = compHand.filter(isValidMove);
    console.log(validMoves, "valid moves")
    
    if (validMoves.length > 0) {
     
      const specialMoves = validMoves.filter(card => card.rank === 'Queen' || card.rank === '8');
      if (specialMoves.length > 0) {
        dropCard(specialMoves);
      } else {
        // Prioritize dropping cards with the same suit as the displayed card
        const sameSuitMoves = validMoves.filter(card => card.suit === displayedCard.suit);
        if (sameSuitMoves.length > 0) {
          dropCard(sameSuitMoves);
        } else {
          // If no special or same suit moves, prioritize dropping lower-ranked cards
          validMoves.sort((a, b) => getCardRankValue(a.rank) - getCardRankValue(b.rank));
          dropCard([validMoves[0]]);
        }
      }
    }else {
      // Computer draws a card
      const aiPickedCrd = availableCards.shift()
      setCompHand([...compHand,aiPickedCrd])
      console.log(aiPickedCrd, "ai picked card")
    }
  };

  function checkForWinner() {
    if (userHand.length === 0) {
      console.log('Player wins!');
    } else if (compHand.length === 0) {
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
        
          <div className='userDec-crrd'>
            {userHand.map((card, index) => (
              <div  className='playCardDec-crd' key={index} onClick={() => playCard(card)}>
                <p>{card.rank} </p> 
                <p>*{card.suit}* </p>
              </div>
            ))}
          </div>
        
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
          
            <div className='userDec-crrd'>
              
              {compHand.map((card, index) => (
                <div  className='playCardDec-crd' key={index} onClick={() => playCard(index)}>
                  
                <p>{card.rank} </p> 
                <p>*{card.suit}* </p>
                  
                </div>
              ))}
            </div>
         
        </div>
      </div>
      <div className='btn'>
        <button>Quit Game</button>
      </div>
    </div>
  )
}

export default HomeLayout