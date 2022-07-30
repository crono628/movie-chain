import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AppWrapper } from './components/AppContext';
import Footer from './components/Footer';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AppWrapper>
        <App />
      </AppWrapper>
    </HashRouter>
  </React.StrictMode>
);
