// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/Home';
import ViewScores from './components/ViewScores';
import HomeLayout from './components/game/homeLayout'
import GamePage from './components/GamePage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="main-sqr">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Standing-Score" element={<ViewScores />} />
          <Route path="/PokerGame" element={<HomeLayout />} />
          <Route path="/PokerGam" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
