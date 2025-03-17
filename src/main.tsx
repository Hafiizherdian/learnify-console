
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import QuestionsProvider from './services/data/QuestionsProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Setup QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <QuestionsProvider>
        <App />
      </QuestionsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
