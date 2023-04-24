import {Suspense, useEffect, useState, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import GA4React, {useGA4React} from 'ga-4-react';
import posthog from 'posthog-js';

import {useAppDispatch} from '@redux/hooks';
import {setIsFullScreenLogOutput} from '@redux/reducers/configSlice';

import {CookiesBanner} from '@molecules';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {composeProviders} from '@utils/composeProviders';

import {ReactComponent as LoadingIcon} from '@assets/loading.svg';

import {useGetClusterConfigQuery} from '@services/config';
import {useApiEndpoint} from '@services/apiEndpoint';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';
import {ModalHandler, ModalOutlet} from '@contexts/ModalContext';

import {AnalyticsProvider} from './AnalyticsProvider';
import {StyledLayoutContentWrapper} from './App.styled';
import App from './App';

const pjson = require('../package.json');

const segmentIOKey = process.env.REACT_APP_SEGMENT_WRITE_KEY || '';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const dispatch = useAppDispatch();
  const ga4React = useGA4React();
  const location = useLocation();
  const navigate = useNavigate();

  const apiEndpoint = useApiEndpoint();

  const {data: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery();

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));
  const isTelemetryEnabled = useMemo(() => (
    !isCookiesVisible && clusterConfig?.enableTelemetry && localStorage.getItem('isGADisabled') === '0'
  ), [isCookiesVisible, clusterConfig]);

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
      window[`ga-disable-G-945BK09GDC`] = true;
      if (posthog.__loaded) {
        posthog.opt_out_capturing();
      }
    } else if (process.env.NODE_ENV !== 'development') {
      // @ts-ignore:
      window[`ga-disable-G-945BK09GDC`] = false;
      if (!posthog.__loaded) {
        posthog.init('phc_DjQgd6iqP8qrhQN6fjkuGeTIk004coiDRmIdbZLRooo', {
          opt_out_capturing_by_default: true,
          mask_all_text: true,
          persistence: 'localStorage',
          property_blacklist: ['$current_url', '$host', '$referrer', '$referring_domain'],
        });
      }
      posthog.opt_in_capturing();

      if (!window.location.href.includes('testkube.io')) {
        const ga4react = new GA4React('G-945BK09GDC');
        ga4react.initialize().catch(() => {});
      }
    }
  }, [isTelemetryEnabled]);

  const mainContextValue = {
    ga4React,
    dispatch,
    clusterConfig,
    isClusterAvailable: true,
  };

  useEffect(() => {
    posthog.capture('$pageview');

    if (ga4React) {
      ga4React.pageview(location.pathname);
    }

    dispatch(setIsFullScreenLogOutput(false));
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

  const config = useMemo(() => ({
    pageTitle: 'Testkube',
    discordUrl: 'https://discord.com/invite/hfq44wtR6Q',
  }), []);

  const dashboardValue = useMemo(() => ({
    navigate,
    location,
    baseUrl: '',
    showLogoInSider: true,
    showSocialLinksInSider: true,
  }), [navigate, location]);

  return composeProviders()
    .append(ConfigContext.Provider, {value: config})
    .append(DashboardContext.Provider, {value: dashboardValue})
    .append(PermissionsProvider, {scope: permissionsScope, resolver: permissionsResolver})
    .append(AnalyticsProvider, {disabled: !isTelemetryEnabled, privateKey: segmentIOKey, appVersion: pjson.version})
    .append(MainContext.Provider, {value: mainContextValue})
    .append(ModalHandler, {})
    .render(
      <>
        <Layout>
          <Sider />
          <StyledLayoutContentWrapper>
            <Content>
              <ErrorBoundary>
                <Suspense fallback={<LoadingIcon />}>
                  <App />
                </Suspense>
              </ErrorBoundary>
            </Content>
          </StyledLayoutContentWrapper>
        </Layout>
        {isCookiesVisible && clusterConfig?.enableTelemetry ? (
          <CookiesBanner onAcceptCookies={onAcceptCookies} onDeclineCookies={onDeclineCookies} />
        ) : null}
        <ModalOutlet />
      </>
    );
};

export default AppRoot;
