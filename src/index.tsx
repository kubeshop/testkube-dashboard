import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import 'antd/dist/antd.css';

import GA4React from 'ga-4-react';

import {store} from '@redux/store';

import {GlobalStyle} from '@styles/globalStyles';
import '@styles/variables.css';

import App from './App';

const ga4react = new GA4React(process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '');

(async () => {
  await ga4react.initialize();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})();
