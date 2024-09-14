import React, { useEffect, useState } from 'react';
import Battle from './Battle';
import { Box, Card } from '@mui/material'
import Header from './components/Header';

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
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Header></Header>
      <Battle />
    </Box>
  );
}

export default App;
