import {useMemo} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {PluginResolver} from '@testkube/plugins';

import LegacyOssOnlyPlugin from '@testkube/web/src/legacyOssOnly';

import {ConfigContext, DashboardContext} from '@contexts';

import {FeatureFlagsProvider} from '@feature-flags';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';
import {useLastCallback} from '@hooks/useLastCallback';

import {ModalHandler, ModalOutletProvider} from '@modal/context';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import AiInsightsPromoPlugin from '@plugins/ai-insights-promo/plugin';
import CloudBannerPlugin from '@plugins/cloud-banner/plugin';
import ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import ClusterPlugin from '@plugins/cluster/plugin';
import ExecutorsPlugin from '@plugins/executors/plugin';
import GeneralPlugin from '@plugins/general/plugin';
import LabelsPlugin from '@plugins/labels/plugin';
import RtkPlugin from '@plugins/rtk/plugin';
import SettingsPlugin from '@plugins/settings/plugin';
import TelemetryPlugin from '@plugins/telemetry/plugin';
import TestSourcesPlugin from '@plugins/test-sources/plugin';
import TestsAndTestSuitesPlugin from '@plugins/tests-and-test-suites/plugin';
import TriggersPlugin from '@plugins/triggers/plugin';
import WebhooksPlugin from '@plugins/webhooks/plugin';

import {composeProviders} from '@utils/composeProviders';
import {externalLinks} from '@utils/externalLinks';

import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const location = useLocation();
  const navigate = useLastCallback(useNavigate());

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
    const plugins = [
      ClusterStatusPlugin,
      TelemetryPlugin,
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
      AiInsightsPromoPlugin,
      LabelsPlugin,
      RtkPlugin,
    ];
    const [Provider, {initialize, routes}] = PluginResolver.of(...plugins).resolve();
    const scope = initialize();
    return [Provider, scope, routes] as const;
  }, []);

  return composeProviders()
    .append(FeatureFlagsProvider, {})
    .append(ConfigContext.Provider, {value: config})
    .append(DashboardContext.Provider, {value: dashboardValue})
    .append(PermissionsProvider, {scope: permissionsScope, resolver: permissionsResolver})
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
