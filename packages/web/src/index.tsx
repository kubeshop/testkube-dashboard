import React from 'react';
import {createRoot} from 'react-dom/client';
import 'reactflow/dist/style.css';

import {GlobalStyle} from '@styles/globalStyles';

import {TelemetryProvider} from '@telemetry/provider';

import AppRoot from './AppRoot';
import './antd-theme/antd-customized.css';
import env from './env';

(async () => {
  const container = document.getElementById('root');
  const root = createRoot(container!);

  const app = {name: 'testkube:ui/oss', version: env.version};

  root.render(
    <React.StrictMode>
      <TelemetryProvider
        prefix="tk.ui."
        app={app}
        gtmId={env.disableTelemetry ? undefined : env.gtmKey}
        debug={env.debugTelemetry}
        paused
      >
        <GlobalStyle />
        <AppRoot />
      </TelemetryProvider>
    </React.StrictMode>
  );
})();
