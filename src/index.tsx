import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import {PageHeader} from '@organisms';
import App from './App';
import './styles/variables.css';
import 'antd/dist/antd.css';
import './styles/global.css';
import {GlobalStyle} from './styles/globalStyles';
import {store} from './redux/store';

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
