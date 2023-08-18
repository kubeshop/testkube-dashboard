import * as Sentry from '@sentry/react';

import {useEffect} from 'react';
import {createRoutesFromChildren, matchRoutes, useLocation, useNavigationType} from 'react-router-dom';

import env from '@env';

if (env.sentryKey) {
  Sentry.init({
    dsn: env.sentryKey,
    integrations: [
      new Sentry.BrowserTracing({
        // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
    ],
  });
}
