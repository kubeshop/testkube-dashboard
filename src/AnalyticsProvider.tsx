import {useEffect, useMemo} from 'react';

import {AnalyticsBrowser} from '@segment/analytics-next';

import {AnalyticsContext} from '@contexts';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

type AnalyticsProviderProps = {
  disabled?: boolean;
  privateKey: string;
  children: React.ReactNode;
  appVersion: string;
};

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = props => {
  const {disabled, privateKey, children, appVersion} = props;

  const notDevEnv = process.env.NODE_ENV !== 'development';

  const analytics = useMemo(() => {
    if (!disabled && privateKey && notDevEnv) {
      return AnalyticsBrowser.load({writeKey: privateKey});
    }
  }, [disabled, privateKey]);

  const hostname = window.location.hostname;

  useEffect(() => {
    if (notDevEnv) {
      FingerprintJS.load()
        .then((fp: any) => fp.get())
        .then((result: any) => {
          analytics?.identify(result.visitorId, {
            hostname,
            appVersion,
          });
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));
    }
  }, []);

  const analyticsTrack = (type: string, data: any) => {
    if (!disabled && notDevEnv) {
      analytics?.track(type, {...data, hostname, appVersion});
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
