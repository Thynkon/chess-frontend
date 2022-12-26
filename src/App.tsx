import React from 'react';
import { AuthProvider } from 'react-auth-kit'
import RouteComponent from './routes/routes';

import './App.css';
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
