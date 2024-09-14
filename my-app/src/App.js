import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Header from './components/Header';
import About from './pages/About';
import Battle from './pages/Battle';
import { Box } from '@mui/material';
import { withAuthInfo } from '@propelauth/react';

const AuthenticatedGame = withAuthInfo(Game);

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/game" element={<AuthenticatedGame />} />
          <Route path="/" element={<AuthenticatedGame />} />
          <Route path="/home" element={<AuthenticatedGame />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<></>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
