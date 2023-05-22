import {useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import GA4React, {useGA4React} from 'ga-4-react';
import posthog from 'posthog-js';

import {useAppDispatch} from '@redux/hooks';

import {CookiesBanner} from '@molecules';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {composeProviders} from '@utils/composeProviders';

import {useApiEndpoint} from '@services/apiEndpoint';
import {useGetClusterConfigQuery} from '@services/config';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';
import {ModalHandler, ModalOutletProvider} from '@contexts/ModalContext';

import {AnalyticsProvider} from './AnalyticsProvider';
import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';
import {externalLinks} from './utils/externalLinks';

import env from './env';

const pjson = require('../package.json');

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const dispatch = useAppDispatch();
  const ga4React = useGA4React();
  const location = useLocation();
  const navigate = useNavigate();

  const apiEndpoint = useApiEndpoint();

  const {data: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery();

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));
  const [featureFlags, setFeatureFlags] = useState<string[]>([]);
  const isTelemetryEnabled = useMemo(
    () => !isCookiesVisible && clusterConfig?.enableTelemetry && localStorage.getItem('isGADisabled') === '0',
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
      // @ts-ignore
      window[`ga-disable-${env.ga4Key}`] = true;
      if (posthog.__loaded) {
        posthog.opt_out_capturing();
      }
    } else if (process.env.NODE_ENV !== 'development') {
      // @ts-ignore:
      window[`ga-disable-${env.ga4Key}`] = false;
      if (env.posthogKey && !posthog.__loaded) {
        posthog.init(env.posthogKey, {
          opt_out_capturing_by_default: true,
          mask_all_text: true,
          persistence: 'localStorage',
          property_blacklist: ['$current_url', '$host', '$referrer', '$referring_domain'],
          loaded: instance => {
            instance.onFeatureFlags(flags => {
              setFeatureFlags(flags);
            });
          },
        });
      }
      if (posthog.__loaded) {
        posthog.opt_in_capturing();
      }

      if (env.ga4Key && !window.location.href.includes('testkube.io')) {
        const ga4react = new GA4React(env.ga4Key);
        ga4react.initialize().catch(() => {});
      }
    }
  }, [isTelemetryEnabled]);

  const mainContextValue = useMemo(
    () => ({
      ga4React,
      dispatch,
      clusterConfig,
      isClusterAvailable: true,
    }),
    [ga4React, dispatch, clusterConfig]
  );

  useEffect(() => {
    posthog.capture('$pageview');

    if (ga4React) {
      ga4React.pageview(location.pathname);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (ga4React) {
      ga4React.gtag('event', 'user_info', {api_host: window.location.host, os: window.navigator.userAgent});
    }
  }, [ga4React]);

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
      appVersion: pjson.version,
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
        {isCookiesVisible && clusterConfig?.enableTelemetry ? (
          <CookiesBanner onAcceptCookies={onAcceptCookies} onDeclineCookies={onDeclineCookies} />
        ) : null}
      </>
    );
};

export default AppRoot;
