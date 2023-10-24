import {useMemo} from 'react';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {PluginResolver} from '@testkube/plugins';

import LegacyOssOnlyPlugin from '@testkube/web/src/legacyOssOnly';

import env from '@env';

import {FeatureFlagsProvider} from '@feature-flags';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {ModalHandler, ModalOutletProvider} from '@modal/context';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver, PermissionsProvider} from '@permissions/base';

import AiInsightsPromoPlugin from '@plugins/ai-insights-promo/plugin';
import CloudBannerPlugin from '@plugins/cloud-banner/plugin';
import ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import ClusterPlugin from '@plugins/cluster/plugin';
import ConfigPlugin from '@plugins/config/plugin';
import ExecutorsPlugin from '@plugins/executors/plugin';
import GeneralPlugin from '@plugins/general/plugin';
import LabelsPlugin from '@plugins/labels/plugin';
import RouterPlugin from '@plugins/router/plugin';
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

  const permissionsResolver = useMemo(() => new BasePermissionsResolver(), []);
  const permissionsScope = useMemo(() => ({}), []);

  // TODO: Allow passing parent scope from Cloud
  const [PluginSystemProvider, root, routing] = useMemo(() => {
    const plugins = [
      ConfigPlugin.configure({discordUrl: externalLinks.discord}),
      RouterPlugin.configure({baseUrl: env.basename || ''}),
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
    ] as const;
    const [Provider, {initialize, routes}] = PluginResolver.of(...plugins).resolve();
    const scope = initialize();
    return [Provider, scope, routes] as const;
  }, []);

  return composeProviders()
    .append(FeatureFlagsProvider, {})
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
