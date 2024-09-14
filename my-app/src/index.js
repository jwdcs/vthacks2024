import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RequiredAuthProvider } from '@propelauth/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RequiredAuthProvider authUrl={process.env.REACT_APP_AUTH_URL}>
        <App />
      </RequiredAuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
