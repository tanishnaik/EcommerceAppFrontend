import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { GlobalSettingsProvider } from './components/GlobalSettingsContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalSettingsProvider>
      <App />
    </GlobalSettingsProvider>
  </StrictMode>,
)

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
      console.log('Service worker registration failed:', err);
    });
  });
}
