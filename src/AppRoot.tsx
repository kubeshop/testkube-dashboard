import {useEffect, useMemo, useState} from 'react';
import ReactGA from 'react-ga4';
import {useLocation, useNavigate} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import posthog from 'posthog-js';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';
import {ModalHandler, ModalOutletProvider} from '@contexts/ModalContext';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {CookiesBanner} from '@molecules';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import {useAppDispatch} from '@redux/hooks';

import {useApiEndpoint} from '@services/apiEndpoint';
import {useGetClusterConfigQuery} from '@services/config';

import anonymizeQueryString from '@utils/anonymizeQueryString';
import {composeProviders} from '@utils/composeProviders';

import {AnalyticsProvider} from './AnalyticsProvider';
import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';
import env from './env';
import {externalLinks} from './utils/externalLinks';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const apiEndpoint = useApiEndpoint();

  const {data: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery();

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));
  const [featureFlags, setFeatureFlags] = useState<string[]>([]);
  const isTelemetryAvailable = clusterConfig?.enableTelemetry && !env.disableTelemetry;
  const isTelemetryEnabled = useMemo(
    () => !isCookiesVisible && isTelemetryAvailable && localStorage.getItem('isGADisabled') === '0',
    [isCookiesVisible, clusterConfig]
  );

  const onAcceptCookies = () => {
    localStorage.setItem('isGADisabled', '0');
    setCookiesVisibility(false);
  };

  const onDeclineCookies = () => {
    localStorage.setItem('isGADisabled', '1');
    setCookiesVisibility(false);
  };

  useEffect(() => {
    if (!isTelemetryEnabled) {
      if (posthog.__loaded) {
        posthog.opt_out_capturing();
      }
    } else if (process.env.NODE_ENV !== 'development') {
      if (env.posthogKey && !posthog.__loaded) {
        posthog.init(env.posthogKey, {
          opt_out_capturing_by_default: true,
          mask_all_text: true,
          persistence: 'localStorage',
          property_blacklist: ['$current_url', '$host', '$referrer', '$referring_domain'],
          ip: false,
          loaded: instance => {
            instance.onFeatureFlags(flags => {
              setFeatureFlags(flags);
            });
          },
        });
        posthog.register({
          version: env.version,
        });
      }
      if (posthog.__loaded) {
        posthog.opt_in_capturing();
      }

      if (env.ga4Key) {
        ReactGA.initialize(env.ga4Key, {
          // To make GTM- keys working properly with react-ga4,
          // we need to override the script URL.
          gtagUrl: env.ga4Key.startsWith('GTM-') ? 'https://www.googletagmanager.com/gtm.js' : undefined,
        });
        ReactGA.gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          functionality_storage: 'granted',
          personalization_storage: 'granted',
          security_storage: 'granted',
        });
      }
    }
  }, [isTelemetryEnabled]);

  const mainContextValue = useMemo(
    () => ({
      dispatch,
      clusterConfig,
      isClusterAvailable: true,
    }),
    [dispatch, clusterConfig]
  );

  useEffect(() => {
    posthog.capture('$pageview');

    ReactGA.send({hitType: 'pageview', page: `${location.pathname}${anonymizeQueryString(location.search)}`});
  }, [location.pathname]);

  useEffect(() => {
    ReactGA.event('user_info', {os: window.navigator.userAgent});
  }, []);

  useEffect(() => {
    refetchClusterConfig();
  }, [apiEndpoint]);

  const permissionsResolver = useMemo(() => new BasePermissionsResolver(), []);
  const permissionsScope = useMemo(() => ({}), []);

  const config = useMemo(
    () => ({
      pageTitle: 'Testkube',
      discordUrl: externalLinks.discord,
    }),
    []
  );

  const dashboardValue = useMemo(
    () => ({
      navigate,
      location,
      baseUrl: '',
      showLogoInSider: true,
      showSocialLinksInSider: true,
      showTestkubeCloudBanner: true,
      isOss: true,
    }),
    [navigate, location]
  );

  return composeProviders()
    .append(ConfigContext.Provider, {value: config})
    .append(DashboardContext.Provider, {value: dashboardValue})
    .append(PermissionsProvider, {scope: permissionsScope, resolver: permissionsResolver})
    .append(AnalyticsProvider, {
      disabled: !isTelemetryEnabled,
      writeKey: env.segmentKey,
      appVersion: env.version,
      featureFlags,
    })
    .append(MainContext.Provider, {value: mainContextValue})
    .append(ModalHandler, {})
    .append(ModalOutletProvider, {})
    .render(
      <>
        <Layout>
          <Sider />
          <StyledLayoutContentWrapper>
            <Content>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </Content>
          </StyledLayoutContentWrapper>
        </Layout>
        {isCookiesVisible && isTelemetryAvailable ? (
          <CookiesBanner onAcceptCookies={onAcceptCookies} onDeclineCookies={onDeclineCookies} />
        ) : null}
      </>
    );
};

export default AppRoot;
