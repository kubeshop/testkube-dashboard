import {useEffect, useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAsync} from 'react-use';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

import {PluginResolver} from '@testkube/plugins';

import LegacyOssOnlyPlugin from '@testkube/web/src/legacyOssOnly';

import {ConfigContext, DashboardContext, MainContext} from '@contexts';

import {FeatureFlagsProvider} from '@feature-flags';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';
import {useLastCallback} from '@hooks/useLastCallback';

import {ModalHandler, ModalOutletProvider} from '@modal/context';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import AiInsightsPromoPlugin from '@plugins/ai-insights-promo/plugin';
import CloudBannerPlugin from '@plugins/cloud-banner/plugin';
import ClusterPlugin from '@plugins/cluster/plugin';
import ExecutorsPlugin from '@plugins/executors/plugin';
import GeneralPlugin from '@plugins/general/plugin';
import SettingsPlugin from '@plugins/settings/plugin';
import TestSourcesPlugin from '@plugins/test-sources/plugin';
import TestsAndTestSuitesPlugin from '@plugins/tests-and-test-suites/plugin';
import TriggersPlugin from '@plugins/triggers/plugin';
import WebhooksPlugin from '@plugins/webhooks/plugin';

import {resetRtkCache, store} from '@redux/store';

import {useApiEndpoint} from '@services/apiEndpoint';
import {useGetClusterConfigQuery} from '@services/config';

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
      isSystemAvailable: Boolean(clusterConfig),
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

  // Reset the in-memory API cache on API endpoint change
  useMemo(() => {
    resetRtkCache(store);
  }, [apiEndpoint]);

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
    }),
    [navigate, location]
  );

  // TODO: Allow passing parent scope from Cloud
  const [PluginSystemProvider, root, routing] = useMemo(() => {
    const [Provider, {initialize, routes}] = PluginResolver.of(
      LegacyOssOnlyPlugin,
      GeneralPlugin,
      ClusterPlugin,
      ExecutorsPlugin,
      WebhooksPlugin,
      TriggersPlugin,
      TestSourcesPlugin,
      SettingsPlugin,
      TestsAndTestSuitesPlugin,
      CloudBannerPlugin,
      AiInsightsPromoPlugin
    ).resolve();
    const scope = initialize();
    return [Provider, scope, routes] as const;
  }, []);

  return composeProviders()
    .append(FeatureFlagsProvider, {})
    .append(ConfigContext.Provider, {value: config})
    .append(DashboardContext.Provider, {value: dashboardValue})
    .append(PermissionsProvider, {scope: permissionsScope, resolver: permissionsResolver})
    .append(MainContext.Provider, {value: mainContextValue})
    .append(PluginSystemProvider, {root})
    .append(ModalHandler, {})
    .append(ModalOutletProvider, {})
    .render(
      <>
        <Layout>
          <Sider />
          <StyledLayoutContentWrapper>
            <Content>
              <ErrorBoundary>
                <App routes={routing} />
              </ErrorBoundary>
            </Content>
          </StyledLayoutContentWrapper>
        </Layout>
      </>
    );
};

export default AppRoot;
