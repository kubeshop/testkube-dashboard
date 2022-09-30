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

  const notDevEnv = process.env.NODE_ENV !== 'development';

  const analytics = useMemo(() => {
    if (privateKey && notDevEnv) {
      return AnalyticsBrowser.load({writeKey: privateKey});
    }
  }, [privateKey]);

  const hostname = window.location.hostname;

  useEffect(() => {
    if (notDevEnv) {
      FingerprintJS.load()
        .then((fp: any) => fp.get())
        .then((result: any) => {
          analytics?.identify(result.visitorId, {
            hostname,
          });
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));
    }
  }, []);

  const analyticsTrack = (type: string, data: any) => {
    if (notDevEnv) {
      analytics?.track(type, {...data, hostname});
    }
  };

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        analyticsTrack,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};
