import {Button, Space} from 'antd';

import {CloudUploadOutlined} from '@ant-design/icons';

import {ConfigurationCard} from '@molecules';

import Colors from '@styles/Colors';

import {ExternalLink} from '@src/components/atoms';
import {Text} from '@src/components/custom-antd';

const ConnectCloud = () => {
  return (
    <ConfigurationCard
      title="Connect to Testkube Cloud"
      description="Connect your current Testkube instance to Testkube Cloud. You can always safely disconnect."
      footerText={
        <Text className="regular middle" color={`${Colors.slate400}`}>
          Learn more about{' '}
          <ExternalLink href="https://docs.testkube.io/testkube-cloud/articles/transition-from-oss">
            connecting to Testkube Cloud
          </ExternalLink>
        </Text>
      }
    >
      <Space size={32} direction="vertical" style={{width: '100%', textAlign: 'center'}}>
        <Space size={20} direction="vertical">
          <CloudUploadOutlined style={{fontSize: '50px', color: `${Colors.slate500}`}} />
          <Text className="regular middle">Get more out of Testkube</Text>
          <Space size={1} direction="vertical">
            <Text className="regular middle" color={`${Colors.slate400}`}>
              Multiple environments, Teams, RBAC and unique collaboration features.
            </Text>
            <ExternalLink href="https://docs.testkube.io/testkube-cloud/articles/intro">
              Learn more about Testkube Cloud
            </ExternalLink>
          </Space>
        </Space>
        <Button
          type="primary"
          onClick={() => window.open('https://cloud.testkube.io/system-init?cloudMigrate=true', '_self')}
        >
          Connect your Testkube Cloud account
        </Button>
      </Space>
    </ConfigurationCard>
  );
};

export default ConnectCloud;
