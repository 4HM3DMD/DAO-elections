import React from 'react';
import ReactDOM from 'react-dom/client';
import StandaloneCRElections from './pages/standalone-cr-elections';
import '../index.css'; // Assuming a global CSS file for Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StandaloneCRElections />
  </React.StrictMode>,
); 