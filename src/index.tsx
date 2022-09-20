import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import GA4React from 'ga-4-react';

import {store} from '@redux/store';

import {detectAdBlock} from '@utils/fetchUtils';

import {GlobalStyle} from '@styles/globalStyles';

import {AnalyticsProvider} from './AnalyticsProvider';
import App from './App';
import './antd-theme/antd-customized.css';
import env from './env';

(async () => {
  const isAdBlockEnabled = await detectAdBlock();

  const segmentIOKey = env.segmentKey || '';

  if (!isAdBlockEnabled) {
    const ga4react = new GA4React(env.ga || '');

    await ga4react.initialize();
  }

  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AnalyticsProvider privateKey={segmentIOKey}>
            <GlobalStyle />
            <App />
          </AnalyticsProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
})();
