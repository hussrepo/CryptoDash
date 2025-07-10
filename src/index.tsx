// Entry point: React and ReactDOM for rendering the app
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// MUI ThemeProvider, theme creation, and baseline CSS for consistent styling
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// --- Define a dark theme with custom palette for branding ---
const darkTheme = createTheme({
    palette: {
        mode: 'dark',                       // Enable dark mode (save user from light mode)
        primary: { main: '#90caf9' },       // Light blue as primary
        secondary: { main: '#f48fb1' },     // Pink accent for secondary
        background: {
            default: '#121212',             // Main background color
            paper: '#1d1d1d',               // Surface color
        },
    },
});

// --- Bootstrap the React application and inject into the DOM ---
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        {/* Provide theme and baseline CSS to the entire app */}
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />  {/* Normalize styles and apply dark background */}
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
