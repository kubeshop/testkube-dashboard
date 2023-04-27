import {Suspense, lazy, useEffect, useMemo, useRef, useState} from 'react';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {CSSTransition} from 'react-transition-group';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import GA4React, {useGA4React} from 'ga-4-react';
import posthog from 'posthog-js';

import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {selectFullScreenLogOutput, setIsFullScreenLogOutput} from '@redux/reducers/configSlice';
import {setExecutors} from '@redux/reducers/executorsSlice';
import {setSources} from '@redux/reducers/sourcesSlice';

import {CookiesBanner, EndpointModal} from '@molecules';
import FullScreenLogOutput from '@molecules/LogOutput/FullscreenLogOutput';
import LogOutputHeader from '@molecules/LogOutput/LogOutputHeader';
import notificationCall from '@molecules/Notification';

import {Sider} from '@organisms';

import {EndpointProcessing, ErrorBoundary, NotFound} from '@pages';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {composeProviders} from '@utils/composeProviders';
import {PollingIntervals} from '@utils/numbers';

import {ReactComponent as LoadingIcon} from '@assets/loading.svg';

import {getApiDetails, getApiEndpoint, isApiEndpointLocked, useApiEndpoint} from '@services/apiEndpoint';
import {useGetClusterConfigQuery} from '@services/config';
import {useGetExecutorsQuery} from '@services/executors';
import {useGetSourcesQuery} from '@services/sources';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';
import {ModalHandler, ModalOutlet} from '@contexts/ModalContext';

import {AnalyticsProvider} from './AnalyticsProvider';
import {StyledLayoutContentWrapper} from './App.styled';

const Tests = lazy(() => import('@pages').then(module => ({default: module.Tests})));
const TestSuites = lazy(() => import('@pages').then(module => ({default: module.TestSuites})));
const Executors = lazy(() => import('@pages').then(module => ({default: module.Executors})));
const Sources = lazy(() => import('@pages').then(module => ({default: module.Sources})));
const Triggers = lazy(() => import('@pages').then(module => ({default: module.Triggers})));
const GlobalSettings = lazy(() => import('@pages').then(module => ({default: module.GlobalSettings})));

const pjson = require('../package.json');

const segmentIOKey = process.env.REACT_APP_SEGMENT_WRITE_KEY || '';

const App: React.FC = () => {
  useAxiosInterceptors();

  const dispatch = useAppDispatch();
  const ga4React = useGA4React();
  const location = useLocation();
  const navigate = useNavigate();

  const protocol = window.location.protocol;
  const isProtocolSecure = protocol === 'https:';
  const wsProtocol = isProtocolSecure ? 'wss://' : 'ws://';

  const apiEndpoint = useApiEndpoint();

  const {isFullScreenLogOutput, logOutput} = useAppSelector(selectFullScreenLogOutput);

  const [isEndpointModalVisible, setEndpointModalState] = useState(false);

  const {data: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery();

  const {data: executors, refetch: refetchExecutors} = useGetExecutorsQuery(null, {
    pollingInterval: PollingIntervals.long,
  });

  const {data: sources, refetch: refetchSources} = useGetSourcesQuery(null, {
    pollingInterval: PollingIntervals.long,
  });

  const logRef = useRef<HTMLDivElement>(null);

  const [isCookiesVisible, setCookiesVisibility] = useState(!localStorage.getItem('isGADisabled'));
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
    dispatch(setExecutors(executors || []));
  }, [executors]);

  useEffect(() => {
    dispatch(setSources(sources || []));
  }, [sources]);

  useEffect(() => {
    // Do not fire the effect if new endpoint is just being set up
    if (location.pathname === '/apiEndpoint') {
      return;
    }

    if (!apiEndpoint) {
      setEndpointModalState(true);
      return;
    }

    getApiDetails(apiEndpoint).catch(error => {
      // Handle race condition
      if (getApiEndpoint() !== apiEndpoint) {
        return;
      }

      // Display popup
      notificationCall('failed', 'Could not receive data from the specified API endpoint');

      // Allow changing API endpoint if there is none in environment variables
      if (!isApiEndpointLocked()) {
        setEndpointModalState(true);
      }
    });
  }, [apiEndpoint]);

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
    refetchExecutors();
    refetchSources();
    refetchClusterConfig();
  }, [apiEndpoint]);

  const permissionsResolver = useMemo(() => new BasePermissionsResolver(), []);
  const permissionsScope = useMemo(() => ({}), []);

  const config = useMemo(
    () => ({
      pageTitle: 'Testkube',
      discordUrl: 'https://discord.com/invite/hfq44wtR6Q',
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
    .append(AnalyticsProvider, {disabled: !isTelemetryEnabled, privateKey: segmentIOKey, appVersion: pjson.version})
    .append(MainContext.Provider, {value: mainContextValue})
    .append(ModalHandler, {})
    .render(
      <>
        <Layout>
          <EndpointModal visible={isEndpointModalVisible} setModalState={setEndpointModalState} />
          <Sider />
          <StyledLayoutContentWrapper>
            <Content>
              <ErrorBoundary>
                <Suspense fallback={<LoadingIcon />}>
                  <Routes>
                    <Route path="tests/*" element={<Tests />} />
                    <Route path="test-suites/*" element={<TestSuites />} />
                    <Route path="executors/*" element={<Executors />} />
                    <Route path="sources/*" element={<Sources />} />
                    <Route path="triggers" element={<Triggers />} />
                    <Route path="settings" element={<GlobalSettings />} />
                    <Route
                      path="/apiEndpoint"
                      element={isApiEndpointLocked() ? <Navigate to="/" replace /> : <EndpointProcessing />}
                    />
                    <Route path="/" element={<Navigate to="/tests" replace />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </Content>
            {isFullScreenLogOutput ? <LogOutputHeader logOutput={logOutput} isFullScreen /> : null}
            <CSSTransition
              nodeRef={logRef}
              in={isFullScreenLogOutput}
              timeout={1000}
              classNames="full-screen-log-output"
              unmountOnExit
            >
              <FullScreenLogOutput ref={logRef} logOutput={logOutput} />
            </CSSTransition>
          </StyledLayoutContentWrapper>
        </Layout>
        {isCookiesVisible && clusterConfig?.enableTelemetry ? (
          <CookiesBanner onAcceptCookies={onAcceptCookies} onDeclineCookies={onDeclineCookies} />
        ) : null}
        <ModalOutlet />
      </>
    );
};

export default App;
