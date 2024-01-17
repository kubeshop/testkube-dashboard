import {useMemo} from 'react';

import {Layout} from 'antd';
import {Content} from 'antd/lib/layout/layout';

import {usePluginSystem} from '@testkube/plugins';

import {ReactComponent as Logo} from '@assets/testkube-symbol-color.svg';

import env from '@env';

import {useAxiosInterceptors} from '@hooks/useAxiosInterceptors';

import {Sider} from '@organisms';

import {ErrorBoundary} from '@pages';

import {BasePermissionsResolver} from '@permissions/base';

import {basePlugins} from '@plugins';
import AiInsightsPromoPlugin from '@plugins/ai-insights-promo/plugin';
import ClusterStatusPlugin from '@plugins/cluster-status/plugin';
import ConfigPlugin from '@plugins/config/plugin';
import defaultRoutePlugin from '@plugins/default-route/default-route.plugin';
import FeatureFlagsPlugin from '@plugins/feature-flags/plugin';
import ModalPlugin from '@plugins/modal/plugin';
import PermissionsPlugin from '@plugins/permissions/plugin';
import PromoBannersPlugin from '@plugins/promo-banners/plugin';
import RouterPlugin from '@plugins/router/plugin';
import RtkResetOnApiChangePlugin from '@plugins/rtk-reset-on-api-change/plugin';
import RtkPlugin from '@plugins/rtk/plugin';
import SettingsPlugin from '@plugins/settings/plugin';
import SiderCloudMigratePlugin from '@plugins/sider-cloud-migrate/plugin';
import SiderLogoPlugin from '@plugins/sider-logo/plugin';
import SiderSupportPlugin from '@plugins/sider-support/plugin';
import StatusPagesPromoPlugin from '@plugins/status-pages-promo/plugin';

import {TelemetryProvider} from '@telemetry/provider';

import {externalLinks} from '@utils/externalLinks';

import App from './App';
import {StyledLayoutContentWrapper} from './App.styled';

const AppRoot: React.FC = () => {
  useAxiosInterceptors();

  const plugins = useMemo(
    () => [
      ...basePlugins,
      defaultRoutePlugin,
      ClusterStatusPlugin,
      ConfigPlugin.configure({discordUrl: externalLinks.discord}),
      RouterPlugin.configure({baseUrl: env.basename || ''}),
      PermissionsPlugin.configure({resolver: new BasePermissionsResolver()}),
      RtkResetOnApiChangePlugin,
      RtkPlugin,
      ModalPlugin,
      SiderLogoPlugin.configure({logo: <Logo />}),
      SiderSupportPlugin,
      SiderCloudMigratePlugin,
      FeatureFlagsPlugin,
      SettingsPlugin,
      AiInsightsPromoPlugin,
      StatusPagesPromoPlugin,
      PromoBannersPlugin.configure({rotationTime: env.bannersRotationTime}),
    ],
    []
  );
  const [PluginProvider, {routes}] = usePluginSystem(plugins);

  return (
    <ErrorBoundary>
      <TelemetryProvider
        prefix="tk.ui."
        app={useMemo(() => ({name: 'testkube:ui/oss', version: env.version}), [])}
        gtmId={env.disableTelemetry ? undefined : env.gtmKey}
        debug={env.debugTelemetry}
        paused
      >
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
      </TelemetryProvider>
    </ErrorBoundary>
  );
};

export default AppRoot;
