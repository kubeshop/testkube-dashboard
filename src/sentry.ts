import * as Sentry from '@sentry/react';

import env from '@env';

if (env.sentryKey) {
  Sentry.init({
    dsn: env.sentryKey,
  });
}
