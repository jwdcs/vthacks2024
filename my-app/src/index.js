import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RequiredAuthProvider } from '@propelauth/react';
import { WinnerContext } from './WinnerContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BaseComponent />
);

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function BaseComponent() {
  const [recipes, setRecipes] = useState();
  const winnerObj = useMemo(() => {
    return { recipes: recipes, setRecipes: setRecipes }
  }, [recipes, setRecipes]);

  return (
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RequiredAuthProvider authUrl={'https://auth.bitefight.mbrenn.net/'}>
          <WinnerContext.Provider value={winnerObj}>
            <App />
          </WinnerContext.Provider>
        </RequiredAuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

reportWebVitals();
