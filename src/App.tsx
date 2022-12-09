import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './routes/routes';

import './App.css';
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

export function App() {
  return (
    <AuthProvider authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === "https:"}>
      <RouteComponent />
    </AuthProvider>
  )
}

export default App;
