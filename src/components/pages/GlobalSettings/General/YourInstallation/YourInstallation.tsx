import {memo} from 'react';

import {FullWidthSpace} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {useClusterDetailsPick} from '@store/clusterDetails';

import env from '../../../../../env';

import {YourInstallationContainer} from './YourInstallation.styled';
import YourInstallationItem from './YourInstallationItem';

const YourInstallation: React.FC = () => {
  const {namespace, version, helmchartVersion} = useClusterDetailsPick('version', 'helmchartVersion', 'namespace');

  const versionRegex = /^(\d+\.)?(\d+\.)(\S+)$/;

  const apiVersion = `${versionRegex.test(version) ? 'v' : version ? '#' : ''}${version}`;
  const dashboardVersion = `${versionRegex.test(env.version) ? 'v' : ''}${env.version}`;
  const helmChartVersion = `${versionRegex.test(helmchartVersion) ? 'v' : ''}${helmchartVersion}`;

  return (
    <ConfigurationCard title="Your installation" description="Details about your current Testkube installation">
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
};

export default memo(YourInstallation);
