import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Header from './components/Header';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/game" element={<Game />} />
        <Route path="/" element={<Game />} />
        <Route path="/home" element={<Game />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<></>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
