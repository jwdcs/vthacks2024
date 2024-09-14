import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Header from './components/Header';
import About from './pages/About';
import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/" element={<Game />} />
          <Route path="/home" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<></>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
