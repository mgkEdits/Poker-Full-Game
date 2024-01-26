// src/components/Buttons.js
import React from 'react';
import { Link } from 'react-router-dom';

const Buttons = () => {
  return (
    <div className='btnwrp'>
     <a> <Link to="/login" className="btn">Login</Link></a>
     <a> <Link to="/signup" className="btn">Signup</Link></a>
    </div>
  );
};

export default Buttons;
