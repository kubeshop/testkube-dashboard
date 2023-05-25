import {PropsWithChildren, useEffect, useMemo} from 'react';

import FingerprintJS from '@fingerprintjs/fingerprintjs';
import {AnalyticsBrowser, Context, Plugin} from '@segment/analytics-next';

import {AnalyticsContext} from '@contexts';

type AnalyticsProviderProps = {
  disabled?: boolean;
  writeKey?: string;
  appVersion: string;
  featureFlags: string[];
};

const maskSensitiveData = (ctx: Context): Context => {
  if (ctx.event.context?.page) {
    ctx.event.context.page.referrer = '';
    ctx.event.context.page.url = `${window.location.protocol}//dummy.testkube${ctx.event.context.page.path}`;
  }
  if (ctx.event.traits?.hostname) {
    ctx.event.traits.hostname = 'dummy.testkube';
  }
  if (ctx.event.properties?.hostname) {
    ctx.event.properties.hostname = 'dummy.testkube';
  }
  return ctx;
};

const CleanSensitiveDataPlugin: Plugin = {
  name: 'CleanSensitiveData',
  version: '0.0.0',
  type: 'before',
  isLoaded: () => true,
  load: () => Promise.resolve(),
  identify: maskSensitiveData,
  track: maskSensitiveData,
  page: maskSensitiveData,
  alias: maskSensitiveData,
  group: maskSensitiveData,
  screen: maskSensitiveData,
};

export const AnalyticsProvider: React.FC<PropsWithChildren<AnalyticsProviderProps>> = props => {
  const {disabled, writeKey, children, appVersion, featureFlags} = props;

  const notDevEnv = process.env.NODE_ENV !== 'development';

  const analytics = useMemo(() => {
    if (!disabled && writeKey && notDevEnv) {
      return AnalyticsBrowser.load({writeKey, plugins: [CleanSensitiveDataPlugin]});
    }
  }, [disabled, writeKey]);

  const hostname = window.location.hostname;

  useEffect(() => {
    if (notDevEnv) {
      FingerprintJS.load()
        .then(fp => fp.get())
        .then(result => {
          analytics?.identify(result.visitorId, {
            hostname,
            appVersion,
          });
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));
    }
  }, []);

  const analyticsTrack = (type: string, data: Record<string, any>) => {
    if (!disabled && notDevEnv) {
      analytics?.track(type, {...data, hostname, appVersion});
    }
  };

  const value = useMemo(
    () => ({
      analytics,
      analyticsTrack,
      featureFlags,
    }),
    [disabled, writeKey, hostname, appVersion]
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};
