import {useEffect, useMemo} from 'react';

import {AnalyticsBrowser} from '@segment/analytics-next';

import {AnalyticsContext} from '@contexts';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

type AnalyticsProviderProps = {
  privateKey: string;
  children: React.ReactNode;
};

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = props => {
  const {privateKey, children} = props;

  const analytics = useMemo(() => AnalyticsBrowser.load({writeKey: privateKey}), [privateKey]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      FingerprintJS.load()
        .then((fp: any) => fp.get())
        .then((result: any) => {
          analytics.identify(result.visitorId, {
            hostname: window.location.hostname,
          });
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));
    }
  }, []);

  const trackEvent = (type: string, data: any) => {
    if (process.env.NODE_ENV !== 'development') {
      analytics.track(type, data);
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        trackEvent,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
