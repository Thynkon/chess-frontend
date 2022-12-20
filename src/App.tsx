import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './routes/routes';

import './App.css';
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { AnimatePresence } from 'framer-motion';

export function App() {
  return (
    <AuthProvider
      authType={'localstorage'}
      authName={'_auth'}
      >
      <AnimatePresence>
        <RouteComponent />
      </AnimatePresence>
    </AuthProvider >
  )
}

export default App;
