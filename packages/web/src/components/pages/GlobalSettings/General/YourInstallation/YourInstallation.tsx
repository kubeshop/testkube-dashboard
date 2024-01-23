import {memo} from 'react';

import {InstallationInfoItem} from '@atoms';

import {FullWidthSpace} from '@custom-antd';

import env from '@env';

import {ConfigurationCard} from '@molecules';

import {useClusterDetailsPick} from '@store/clusterDetails';

import {YourInstallationContainer} from './YourInstallation.styled';

const YourInstallation: React.FC = () => {
  const {namespace, version, helmchartVersion} = useClusterDetailsPick('version', 'helmchartVersion', 'namespace');

  const versionRegex = /^(\d+\.)?(\d+\.)(\S+)$/;

  const apiVersion = `${versionRegex.test(version) ? 'v' : version ? '#' : ''}${version}`;
  const dashboardVersion = `${versionRegex.test(env.version) ? 'v' : ''}${env.version}`;
  const helmChartVersion = helmchartVersion
    ? `${versionRegex.test(helmchartVersion) ? 'v' : ''}${helmchartVersion}`
    : '-';

  return (
    <ConfigurationCard
      title="Your installation"
      description="Details about your current Testkube installation"
      name="installation-card"
      readOnly
    >
      <FullWidthSpace size={32} direction="vertical">
        <YourInstallationContainer>
          <InstallationInfoItem label="Namespace" value={namespace} />
          <InstallationInfoItem label="API Version" value={apiVersion} />
          <InstallationInfoItem label="Dashboard Version" value={dashboardVersion} />
          <InstallationInfoItem label="Helm Chart Version" value={helmChartVersion} />
        </YourInstallationContainer>
      </FullWidthSpace>
    </ConfigurationCard>
  );
};

export default memo(YourInstallation);
