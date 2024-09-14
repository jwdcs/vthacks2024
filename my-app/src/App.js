import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from Flask API
    fetch('http://localhost:8000/api/test')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>Flask and React Integration</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
