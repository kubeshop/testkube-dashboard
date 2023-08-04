import {FullWidthSpace} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {useApiDetailsField} from '@src/store/apiDetails';

import env from '../../../../../env';

import {YourInstallationContainer} from './YourInstallation.styled';
import YourInstallationItem from './YourInstallationItem';

const YourInstallation: React.FC = () => {
  const [data] = useApiDetailsField('data');

  const versionRegex = /^(\d+\.)?(\d+\.)?(\*|\d+)$/;

  const apiVersion = `${versionRegex.test(data?.version) ? 'v' : '#'}${data?.version}`;
  const dashboardVersion = `${versionRegex.test(env.version) ? 'v' : ''}${env.version}`;
  const helmChartVersion = `${versionRegex.test(data?.helmchartVersion) ? 'v' : ''}${data?.helmchartVersion}`;

  return (
    <ConfigurationCard title="Your installation" description="Details about your current Testkube installation">
      <FullWidthSpace size={32} direction="vertical">
        <YourInstallationContainer>
          <YourInstallationItem label="Namespace" value={data?.namespace} />
          <YourInstallationItem label="API Version" value={apiVersion} />
          <YourInstallationItem label="Dashboard Version" value={dashboardVersion} />
          <YourInstallationItem label="Helm Chart Version" value={helmChartVersion} />
        </YourInstallationContainer>
      </FullWidthSpace>
    </ConfigurationCard>
  );
};

export default YourInstallation;
