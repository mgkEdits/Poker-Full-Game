// src/components/Buttons.js
import React from 'react';
import { Link } from 'react-router-dom';

const Buttons = () => {
  return (
    <div className="buttons">
      <Link to="/login" className="btn">Login</Link>
      <Link to="/signup" className="btn">Signup</Link>
    </div>
  );
};

export default Buttons;
