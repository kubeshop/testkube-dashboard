import {CloudUploadOutlined} from '@ant-design/icons';

import {ExternalLink} from '@atoms';

import {Button, FullWidthSpace, Text} from '@custom-antd';

import {ConfigurationCard} from '@molecules';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

const ConnectCloud: React.FC = () => {
  return (
    <ConfigurationCard
      title="Connect to Testkube Pro"
      description="Connect your current Testkube instance to Testkube Pro. You can always safely disconnect."
      name="connect-cloud-card"
      footer={
        <Text className="regular middle" color={Colors.slate400}>
          Learn more about{' '}
          <ExternalLink href={externalLinks.transitionFromOSS}>connecting to Testkube Pro</ExternalLink>
        </Text>
      }
      readOnly
    >
      <FullWidthSpace size={32} direction="vertical" style={{textAlign: 'center'}}>
        <FullWidthSpace size={20} direction="vertical">
          <CloudUploadOutlined style={{fontSize: '50px', color: Colors.slate500}} />
          <Text className="regular middle">Get more out of Testkube</Text>
          <FullWidthSpace size={1} direction="vertical">
            <Text className="regular middle" color={Colors.slate400}>
              Multiple environments, Teams, RBAC and unique collaboration features.
            </Text>
            <ExternalLink href={externalLinks.cloudIntro}>Learn more about Testkube Pro</ExternalLink>
          </FullWidthSpace>
        </FullWidthSpace>
        <Button $customType="primary" onClick={() => window.open(externalLinks.OSStoCloudMigration, '_self')}>
          Connect your Testkube Pro account
        </Button>
      </FullWidthSpace>
    </ConfigurationCard>
  );
};

export default ConnectCloud;
