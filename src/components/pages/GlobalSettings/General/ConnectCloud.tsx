import {Button} from 'antd';

import {CloudUploadOutlined} from '@ant-design/icons';

import {ExternalLink} from '@atoms';

import {FullWidthSpace, Text} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import {openOSSToCloudMigrateLink} from '@utils/externalLinks';

import Colors from '@styles/Colors';

const ConnectCloud: React.FC = () => {
  return (
    <ConfigurationCard
      title="Connect to Testkube Cloud"
      description="Connect your current Testkube instance to Testkube Cloud. You can always safely disconnect."
      footerText={
        <Text className="regular middle" color={Colors.slate400}>
          Learn more about{' '}
          <ExternalLink href="https://docs.testkube.io/testkube-cloud/articles/transition-from-oss">
            connecting to Testkube Cloud
          </ExternalLink>
        </Text>
      }
    >
      <FullWidthSpace size={32} direction="vertical" style={{textAlign: 'center'}}>
        <FullWidthSpace size={20} direction="vertical">
          <CloudUploadOutlined style={{fontSize: '50px', color: Colors.slate500}} />
          <Text className="regular middle">Get more out of Testkube</Text>
          <FullWidthSpace size={1} direction="vertical">
            <Text className="regular middle" color={Colors.slate400}>
              Multiple environments, Teams, RBAC and unique collaboration features.
            </Text>
            <ExternalLink href="https://docs.testkube.io/testkube-cloud/articles/intro">
              Learn more about Testkube Cloud
            </ExternalLink>
          </FullWidthSpace>
        </FullWidthSpace>
        <Button type="primary" onClick={openOSSToCloudMigrateLink}>
          Connect your Testkube Cloud account
        </Button>
      </FullWidthSpace>
    </ConfigurationCard>
  );
};

export default ConnectCloud;
