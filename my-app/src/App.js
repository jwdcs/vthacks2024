import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Game from './components/Game';
import Header from './components/Header';
import About from './pages/About';
import Battle from './pages/Battle';
import Preferences from './pages/Preferences'
import { Box } from '@mui/material';
import { withAuthInfo } from '@propelauth/react';

const AuthBattle = withAuthInfo(Battle);

// async function whoAmI(accessToken) {
//   return fetch('/api/whoami', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   }).then((res) => res.json())
// }

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Header />
        <Routes>
          <Route path="/battle" element={<AuthBattle />} />
          <Route path="/" element={<AuthBattle />} />
          <Route path="/about" element={<About />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/winner" element={<WinnerPage />} /> {/* Add route for WinnerPage */}
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
