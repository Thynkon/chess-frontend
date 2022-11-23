import React from 'react';
import Chessground from "@react-chess/chessground";

import logo from './logo.svg';

import './App.css';
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

function App() {
  return (
    <div className="App">
      <Chessground />
    </div>
  );
}

export default App;
