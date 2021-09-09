import React from 'react';
import ReactDOM from 'react-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import App from './App';
import './styles/variables.css';
import 'antd/dist/antd.css';
import GlobalStyle from './styles/globalStyles';

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 5000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryCache}>
      <GlobalStyle />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
