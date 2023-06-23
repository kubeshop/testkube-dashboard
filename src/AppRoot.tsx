import {useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAsync, useUpdate} from 'react-use';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

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

import {useTelemetry} from '@telemetry';

import anonymizeQueryString from '@utils/anonymizeQueryString';
import {composeProviders} from '@utils/composeProviders';

import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';
import {externalLinks} from './utils/externalLinks';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const telemetry = useTelemetry();
  const apiEndpoint = useApiEndpoint();
  const rerender = useUpdate();

  const {data: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery();

  const telemetryConsent = localStorage.getItem('isGADisabled');
  const isTelemetryAvailable = telemetry.configured && clusterConfig?.enableTelemetry;
  const isCookiesVisible = !telemetryConsent;

  const onAcceptCookies = () => {
    localStorage.setItem('isGADisabled', '0');
    rerender();
  };

  const onDeclineCookies = () => {
    localStorage.setItem('isGADisabled', '1');
    rerender();
  };

  // Pause/resume telemetry based on the cluster settings
  useEffect(() => {
    if (clusterConfig?.enableTelemetry) {
      telemetry.resume();
    } else {
      telemetry.pause();
    }
  }, [clusterConfig]);

  // Disable/enable telemetry based on user consent
  useEffect(() => {
    if (telemetryConsent === '0') {
      telemetry.enable();
    } else {
      telemetry.disable();
    }
  }, [telemetryConsent]);

  const mainContextValue = useMemo(
    () => ({
      dispatch,
      clusterConfig,
      isClusterAvailable: true,
    }),
    [dispatch, clusterConfig]
  );

  const {value: visitorId} = useAsync(async () => {
    const fp = await FingerprintJS.load();
    const value = await fp.get();
    return value.visitorId;
  });

  useEffect(() => {
    if (visitorId) {
      telemetry.set({userID: visitorId});
    }
  }, [visitorId, clusterConfig]);

  useEffect(() => {
    telemetry.set({browserName: window.navigator.userAgent});
  }, [clusterConfig]);

  useEffect(() => {
    telemetry.pageView(`${location.pathname}${anonymizeQueryString(location.search)}`);
  }, [location.pathname, clusterConfig]);

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
    }),
    [navigate, location]
  );

  return composeProviders()
    .append(ConfigContext.Provider, {value: config})
    .append(DashboardContext.Provider, {value: dashboardValue})
    .append(PermissionsProvider, {scope: permissionsScope, resolver: permissionsResolver})
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
