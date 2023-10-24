import {useMemo} from 'react';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {usePluginSystem} from '@testkube/plugins/src/usePluginSystem';

import LegacyOssOnlyPlugin from '@testkube/web/src/legacyOssOnly';

import env from '@env';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver} from '@permissions/base';

import AiInsightsPromoPlugin from '@plugins/ai-insights-promo/plugin';
import CloudBannerPlugin from '@plugins/cloud-banner/plugin';
import ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import ClusterPlugin from '@plugins/cluster/plugin';
import ConfigPlugin from '@plugins/config/plugin';
import ExecutorsPlugin from '@plugins/executors/plugin';
import FeatureFlagsPlugin from '@plugins/feature-flags/plugin';
import GeneralPlugin from '@plugins/general/plugin';
import LabelsPlugin from '@plugins/labels/plugin';
import ModalPlugin from '@plugins/modal/plugin';
import PermissionsPlugin from '@plugins/permissions/plugin';
import RouterPlugin from '@plugins/router/plugin';
import RtkPlugin from '@plugins/rtk/plugin';
import SettingsPlugin from '@plugins/settings/plugin';
import TelemetryPlugin from '@plugins/telemetry/plugin';
import TestSourcesPlugin from '@plugins/test-sources/plugin';
import TestsAndTestSuitesPlugin from '@plugins/tests-and-test-suites/plugin';
import TriggersPlugin from '@plugins/triggers/plugin';
import WebhooksPlugin from '@plugins/webhooks/plugin';

import {externalLinks} from '@utils/externalLinks';

import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  // TODO: Allow passing parent scope from Cloud
  const plugins = useMemo(
    () => [
      ConfigPlugin.configure({discordUrl: externalLinks.discord}),
      RouterPlugin.configure({baseUrl: env.basename || ''}),
      PermissionsPlugin.configure({resolver: new BasePermissionsResolver()}),
      FeatureFlagsPlugin,
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
      ModalPlugin,
    ],
    []
  );
  const [PluginProvider, {routes}] = usePluginSystem(plugins);

  return (
    <PluginProvider>
      <Layout>
        <Sider />
        <StyledLayoutContentWrapper>
          <Content>
            <ErrorBoundary>
              <App routes={routes} />
            </ErrorBoundary>
          </Content>
        </StyledLayoutContentWrapper>
      </Layout>
    </PluginProvider>
  );
};

export default AppRoot;
