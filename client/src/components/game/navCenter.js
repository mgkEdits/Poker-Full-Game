import React from 'react'
import { useState, useEffect } from 'react';

function NavCenter() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Convert seconds to minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className='navCenter-crd'>
        <div className='left-navBar'>
        <a href=''>Timer : {minutes}m {seconds}s</a>
        </div>

        <div className='right-navBar'>
        <h2>Running Score :</h2>
            
        </div>
    </div>
  )
}

export default NavCenter