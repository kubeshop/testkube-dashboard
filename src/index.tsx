import React from 'react';
import ReactDOM from 'react-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {BrowserRouter as Router} from 'react-router-dom';

import {PageHeader} from '@organisms';
import App from './App';
import './styles/variables.css';
import 'antd/dist/antd.css';
import './styles/global.css';
import {GlobalStyle} from './styles/globalStyles';

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: true,
      staleTime: 5000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>


    <QueryClientProvider client={queryCache}>
      <Router>
        <PageHeader />
        <GlobalStyle />
        <App />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
