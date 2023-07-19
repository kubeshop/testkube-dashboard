import {useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAsync} from 'react-use';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

import {ReactComponent as NewIcon} from '@assets/newIcon.svg';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';
import {ModalHandler, ModalOutletProvider} from '@contexts/ModalContext';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import {useAppDispatch} from '@redux/hooks';

import {useApiEndpoint} from '@services/apiEndpoint';
import {useGetClusterConfigQuery} from '@services/config';

import {useTelemetry, useTelemetryValue} from '@telemetry';

import anonymizeQueryString from '@utils/anonymizeQueryString';
import {composeProviders} from '@utils/composeProviders';
import {safeRefetch} from '@utils/fetchUtils';

import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';
import TestExecutionDetailsArtifacts from './components/molecules/ExecutionDetails/TestExecutionDetails/TestExecutionDetailsArtifacts';
import {PluginItems} from './plugins/PluginsContext';
import createPluginManager from './plugins/createPluginManager';
import {externalLinks} from './utils/externalLinks';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const telemetry = useTelemetry();
  const apiEndpoint = useApiEndpoint();

  const {currentData: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery();

  // Pause/resume telemetry based on the cluster settings
  useEffect(() => {
    if (clusterConfig?.enableTelemetry) {
      telemetry.resume();
    } else {
      telemetry.pause();
    }
  }, [clusterConfig]);

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

  useTelemetryValue('userID', visitorId, true);
  useTelemetryValue('browserName', window.navigator.userAgent);

  useEffect(() => {
    telemetry.pageView(`${location.pathname}${anonymizeQueryString(location.search)}`);
  }, [location.pathname, clusterConfig]);

  // FIXME: Hack - for some reason, useEffect was not called on API endpoint change.
  useMemo(() => {
    setTimeout(() => safeRefetch(refetchClusterConfig));
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

  const pluginManager = createPluginManager();

  pluginManager.add({
    name: 'ai-insights',
    setup: (pluginItems: PluginItems) => {
      pluginItems['executionDetailsTabs'].push({
        // this is a new Tab
        getComponent: (props: {id: string}) => {
          return {
            key: 'ai-insights-tab',
            // TODO create component for this
            label: (
              <div style={{display: 'flex', gap: '8px'}}>
                AI Inisghts <NewIcon />
              </div>
            ),
            children: <TestExecutionDetailsArtifacts {...props} />,
          };
        },
        order: 1,
      });
    },
  });

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
                <App pluginManager={pluginManager} />
              </ErrorBoundary>
            </Content>
          </StyledLayoutContentWrapper>
        </Layout>
      </>
    );
};

export default AppRoot;
