import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryClient from './services/ReactQuery'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={ReactQueryClient}>
      <ReactQueryDevtools
        initialIsOpen={false}
        position='top-right'
      />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
