import './game.css'
import React from 'react'
import NavBar from './navBar'
import NavCenter from './navCenter'
import UserDec from './userDec'
import CardDec from './cardDec'
import Gamedec from './gamedec'
import PcDec from './pcDec'



function homeLayout() {
  return (
    <div className='homeLayout-crd'>
    <NavBar />
    <NavCenter/>
    <div className='crd-wrap'>
    <UserDec/>
    <div className='crd-shell'>
       <CardDec/>
       <Gamedec/>

    </div>
    <PcDec/>
    </div>
    <div className='btn'>
    <button>Quit Game</button>
    </div>
    </div>
  )
}

export default homeLayout