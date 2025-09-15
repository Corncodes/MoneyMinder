// Main entry point for the MoneyMinder React application
// This file sets up the React root and imports necessary fonts for Material-UI

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import Roboto font variants for Material-UI components
// These fonts provide consistent typography throughout the application
import "@fontsource/roboto/300.css";  // Light weight
import "@fontsource/roboto/400.css";  // Regular weight
import "@fontsource/roboto/500.css";  // Medium weight
import "@fontsource/roboto/700.css";  // Bold weight

// Create and render the React application root
// StrictMode helps identify potential problems during development
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
