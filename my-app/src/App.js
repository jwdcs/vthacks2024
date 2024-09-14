import React, { useEffect, useState } from 'react';
import Battle from './Battle';
import { Box}  from '@mui/material'

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
    <Box sx={{ width: "100vw", height: "100vh"}}>
      <Battle/>
    </Box>
  );
}

export default App;
