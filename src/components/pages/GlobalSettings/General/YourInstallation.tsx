import {FC, memo} from 'react';

import {FullWidthSpace} from '@custom-antd/FullWidthSpace';

import {env} from '@env';

import {ConfigurationCard} from '@molecules/ConfigurationCard';

import {useClusterDetailsPick} from '@store/clusterDetails';

import {YourInstallationContainer} from './YourInstallation.styled';
import {YourInstallationItem} from './YourInstallation/YourInstallationItem';

export const YourInstallation: FC = memo(() => {
  const {namespace, version, helmchartVersion} = useClusterDetailsPick('version', 'helmchartVersion', 'namespace');

  const versionRegex = /^(\d+\.)?(\d+\.)(\S+)$/;

  const apiVersion = `${versionRegex.test(version) ? 'v' : version ? '#' : ''}${version}`;
  const dashboardVersion = `${versionRegex.test(env.version) ? 'v' : ''}${env.version}`;
  const helmChartVersion = `${versionRegex.test(helmchartVersion) ? 'v' : ''}${helmchartVersion}`;

  return (
    <ConfigurationCard
      title="Your installation"
      description="Details about your current Testkube installation"
      readOnly
    >
      <FullWidthSpace size={32} direction="vertical">
        <YourInstallationContainer>
          <YourInstallationItem label="Namespace" value={namespace} />
          <YourInstallationItem label="API Version" value={apiVersion} />
          <YourInstallationItem label="Dashboard Version" value={dashboardVersion} />
          <YourInstallationItem label="Helm Chart Version" value={helmChartVersion} />
        </YourInstallationContainer>
      </FullWidthSpace>
    </ConfigurationCard>
  );
});
