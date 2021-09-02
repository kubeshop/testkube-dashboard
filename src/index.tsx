import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import App from './App';
import './styles/variables.css';
import 'antd/dist/antd.css';
import GlobalStyle from './styles/globalStyles';

ReactDOM.render(
  <React.StrictMode>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
