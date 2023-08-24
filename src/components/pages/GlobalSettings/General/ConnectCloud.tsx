import {FC} from 'react';

import {CloudUploadOutlined} from '@ant-design/icons';

import {ExternalLink} from '@atoms/ExternalLink';

import {Button} from '@custom-antd/Button';
import {FullWidthSpace} from '@custom-antd/FullWidthSpace';
import {Text} from '@custom-antd/Typography/Text';

import {ConfigurationCard} from '@molecules/ConfigurationCard';

import {Colors} from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

export const ConnectCloud: FC = () => {
  return (
    <ConfigurationCard
      title="Connect to Testkube Cloud"
      description="Connect your current Testkube instance to Testkube Cloud. You can always safely disconnect."
      footer={
        <Text className="regular middle" color={Colors.slate400}>
          Learn more about{' '}
          <ExternalLink href={externalLinks.transitionFromOSS}>connecting to Testkube Cloud</ExternalLink>
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
            <ExternalLink href={externalLinks.cloudIntro}>Learn more about Testkube Cloud</ExternalLink>
          </FullWidthSpace>
        </FullWidthSpace>
        <Button $customType="primary" onClick={() => window.open(externalLinks.OSStoCloudMigration, '_self')}>
          Connect your Testkube Cloud account
        </Button>
      </FullWidthSpace>
    </ConfigurationCard>
  );
};
