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

(async () => {
  const isAdBlockEnabled = await detectAdBlock();

  const segmentIOKey = process.env.REACT_APP_SEGMENT_WRITE_KEY || '';

  if (!isAdBlockEnabled) {
    const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '');

    await ga4react.initialize();
  }

  const container = document.getElementById('root');
  const root = createRoot(container!);

  const rootRoute = process.env.REACT_APP_ROOT_ROUTE || '';

  // If the user wants to specify a PathPrefix in Ingress controller we should
  // set a basename to BrowserRouter. But since react-router-dom v6 they stopped
  // mounting the router if the url does not contain this basename saying
  // "<Router basename="/basename"> is not able to match the URL e.g. "/" because it does not start with
  // the basename, so the <Router> won't render anything." So if we want to visit a website without knowing
  // that we should add some basename we will not be able to see anything.
  // Big thread here https://github.com/remix-run/react-router/issues/8427
  if (window.location.pathname !== rootRoute && !window.location.pathname.startsWith(rootRoute)) {
    window.history.pushState({}, '', rootRoute);
  }

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter basename={rootRoute}>
          <AnalyticsProvider privateKey={segmentIOKey}>
            <GlobalStyle />
            <App />
          </AnalyticsProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
})();
