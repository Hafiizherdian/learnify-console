
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QuestionsProvider from './services/data/QuestionsProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QuestionsProvider>
      <App />
    </QuestionsProvider>
  </React.StrictMode>,
);
