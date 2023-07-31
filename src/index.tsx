import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import 'reactflow/dist/style.css';

import {store} from '@redux/store';

import {GlobalStyle} from '@styles/globalStyles';

import {TelemetryProvider} from '@telemetry';

import AppRoot from './AppRoot';
import './antd-theme/antd-customized.css';
import env from './env';

(async () => {
  const container = document.getElementById('root');
  const root = createRoot(container!);

  const app = {name: 'testkube:ui/oss', version: env.version};
  const basename = env.basename || '';

  // If the user wants to specify a PathPrefix in Ingress controller we should
  // set a basename to BrowserRouter. But since react-router-dom v6 they stopped
  // mounting the router if the url does not contain this basename saying
  // "<Router basename="/basename"> is not able to match the URL e.g. "/" because it does not start with
  // the basename, so the <Router> won't render anything." So if we want to visit a website without knowing
  // that we should add some basename we will not be able to see anything.
  // Big thread here https://github.com/remix-run/react-router/issues/8427

  root.render(
    <React.StrictMode>
      <TelemetryProvider
        prefix="tk.ui."
        app={app}
        gtmId={env.disableTelemetry ? undefined : env.gtmKey}
        debug={env.debugTelemetry}
        paused
      >
        <ReduxProvider store={store}>
          <BrowserRouter basename={basename}>
            <GlobalStyle />
            <AppRoot />
          </BrowserRouter>
        </ReduxProvider>
      </TelemetryProvider>
    </React.StrictMode>
  );
})();
