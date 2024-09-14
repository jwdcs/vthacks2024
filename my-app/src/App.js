import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import Battle from './pages/Battle';
import Header from './components/Header';
import About from './pages/About';
import { Box } from '@mui/material';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from Flask API
    fetch('http://localhost:5000/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <BrowserRouter>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/battle" element={<Battle />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<></>} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
