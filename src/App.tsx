import React, { useEffect } from 'react';
import Chessground from "@react-chess/chessground";
import { parseFen } from 'chessops/fen';
import { Chess } from 'chessops/chess';

import logo from './logo.svg';

import './App.css';
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { Config } from 'chessground/config';

function App() {
  useEffect(() => {

    const setup = parseFen('r1bqkbnr/ppp2Qpp/2np4/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4').unwrap();
    const pos = Chess.fromSetup(setup).unwrap();
    console.assert(pos.isCheckmate());
  });

  const cfg: Config = {
    animation: {
      enabled: true,
    },
    coordinates: true,
    events: {
      move: function (origin, destination, captured_piece) {
        console.log("Original move: " + origin + ", destination: " + destination + "captured_piece " + captured_piece);
      }
    }
  }
  return (
    <div className="App">
      <Chessground config={cfg} />
    </div>
  );
}

export default App;
