import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import GA4React from 'ga-4-react';

import {store} from '@redux/store';

import {detectAdBlock} from '@utils/fetchUtils';

import {GlobalStyle} from '@styles/globalStyles';
import '@styles/variables.css';

import App from './App';
import './antd-theme/antd-customized.css';

(async () => {
  const isAdBlockEnabled = await detectAdBlock();

  if (!isAdBlockEnabled) {
    const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '');

    await ga4react.initialize();
  }

  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
})();
