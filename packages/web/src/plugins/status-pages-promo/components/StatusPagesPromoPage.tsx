import {ReactComponent as CreateTestIcon} from '@assets/create-test.svg';
import {ReactComponent as StatusPagesMock} from '@assets/statusPagesMock.svg';

import {ExternalLink} from '@atoms';

import {Button, Text, Title} from '@custom-antd';

import {useLastCallback} from '@hooks/useLastCallback';

import {HelpCard} from '@molecules';

import {PageBlueprint} from '@organisms';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

import {ContentContainer, DecayingContainer, HelpContainer} from './StatusPagesPromoPage.styled';

const StatusPagesPromoPage = () => (
  <PageBlueprint
    title="Status page"
    description={
      <>
        See and share your services status. Learn more about{' '}
        <ExternalLink href={externalLinks.statusPages}>status pages on Testkube</ExternalLink>.
      </>
    }
  >
    <DecayingContainer>
      <StatusPagesMock />
    </DecayingContainer>

    <ContentContainer size={32}>
      <CreateTestIcon />

      <Title className="text-center">Monitor your services status</Title>

      <Text className="regular middle text-center" color={Colors.slate400}>
        Enable your colleagues or external users to monitor your services status and be notified about incidents.
      </Text>

      <Text className="regular middle text-center" color={Colors.slate400}>
        Status pages work only on Testkube Cloud.
      </Text>

      <Button
        onClick={useLastCallback(() => {
          window.open(externalLinks.OSStoCloudMigration, '_blank');
        })}
      >
        Sign in
      </Button>

      <HelpContainer>
        <HelpCard isLink link={externalLinks.statusPages}>
          Learn more about status pages
        </HelpCard>
      </HelpContainer>
    </ContentContainer>
  </PageBlueprint>
);

export default StatusPagesPromoPage;
