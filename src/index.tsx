import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import {PageHeader} from '@organisms';
import {Provider} from 'react-redux';
import App from './App';
import './styles/variables.css';
import 'antd/dist/antd.css';
import './styles/global.css';
import {GlobalStyle} from './styles/globalStyles';
import {store} from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PageHeader />
        <GlobalStyle />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
