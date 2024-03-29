import React from 'react';
import {createRoot} from 'react-dom/client';
import 'reactflow/dist/style.css';

import {GlobalStyle} from '@styles/globalStyles';

import AppRoot from './AppRoot';
import './antd-theme/antd-customized.css';
import {initializeApiInfoData} from './utils/apiInfo';

initializeApiInfoData();

(async () => {
  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <AppRoot />
    </React.StrictMode>
  );
})();
