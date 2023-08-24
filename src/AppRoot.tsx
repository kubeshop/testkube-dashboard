import {useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAsync} from 'react-use';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';

import {FeatureFlagsProvider} from '@feature-flags';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';
import {useLastCallback} from '@hooks/useLastCallback';

import {ModalHandler, ModalOutletProvider} from '@modal/context';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import createAiInsightsPlugin from '@plugins/definitions/ai-insights';
import {Plugin} from '@plugins/types';

import {useApiEndpoint} from '@services/apiEndpoint';
import {useGetClusterConfigQuery} from '@services/config';

import {initializeExecutorsStore} from '@store/executors';
import {initializeSourcesStore} from '@store/sources';
import {initializeTestSuitesStore} from '@store/testSuites';
import {initializeTestsStore} from '@store/tests';

import {useTelemetry, useTelemetryValue} from '@telemetry/hooks';

import anonymizeQueryString from '@utils/anonymizeQueryString';
import {composeProviders} from '@utils/composeProviders';
import {externalLinks} from '@utils/externalLinks';
import {safeRefetch} from '@utils/fetchUtils';

import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const location = useLocation();
  const navigate = useLastCallback(useNavigate());
  const telemetry = useTelemetry();
  const apiEndpoint = useApiEndpoint();

  // TODO: Unify all store providers and move them there?
  //       Otherwise, these are not available from modals.
  const [ExecutorsProvider] = initializeExecutorsStore();
  const [SourcesProvider] = initializeSourcesStore();
  const [TestsProvider] = initializeTestsStore();
  const [TestSuitesProvider] = initializeTestSuitesStore();

  const {currentData: clusterConfig, refetch: refetchClusterConfig} = useGetClusterConfigQuery(undefined, {
    skip: !apiEndpoint,
  });

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
      clusterConfig,
      isClusterAvailable: Boolean(clusterConfig),
    }),
    [clusterConfig]
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

  const plugins: Plugin[] = useMemo(() => [createAiInsightsPlugin()], []);

  return composeProviders()
    .append(FeatureFlagsProvider, {})
    .append(ConfigContext.Provider, {value: config})
    .append(DashboardContext.Provider, {value: dashboardValue})
    .append(PermissionsProvider, {scope: permissionsScope, resolver: permissionsResolver})
    .append(MainContext.Provider, {value: mainContextValue})
    .append(ExecutorsProvider, {})
    .append(SourcesProvider, {})
    .append(TestsProvider, {})
    .append(TestSuitesProvider, {})
    .append(ModalHandler, {})
    .append(ModalOutletProvider, {})
    .render(
      <>
        <Layout>
          <Sider />
          <StyledLayoutContentWrapper>
            <Content>
              <ErrorBoundary>
                <App plugins={plugins} />
              </ErrorBoundary>
            </Content>
          </StyledLayoutContentWrapper>
        </Layout>
      </>
    );
};

export default AppRoot;
