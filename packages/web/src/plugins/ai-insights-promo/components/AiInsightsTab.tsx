import {ReactComponent as LockedIcon} from '@assets/lockedIcon.svg';

import ExternalLink from '@atoms/ExternalLink';

import {Button, Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

import {AiInsightContainer, AiInsightContent} from './AiInsightsTab.styled';

const AiInsightsTab = () => (
  <AiInsightContainer>
    <AiInsightContent data-testid="ai-insights-tab-oss">
      <LockedIcon />
      <Text className="big bold"> This feature is available only in Testkube Cloud.</Text>
      <Text color={Colors.slate400}>
        Start using Testkube Cloud to get AI insights for your test executions, as well as other exclusive features.
        <ExternalLink href={externalLinks.testkubeCloud}> Learn more</ExternalLink>
      </Text>
      <Button
        type="primary"
        data-testid="cloud-cta-button"
        onClick={() => {
          window.open(externalLinks.testkubeCloud, '_blank');
        }}
      >
        Go to Testkube Cloud
      </Button>
    </AiInsightContent>
  </AiInsightContainer>
);

export default AiInsightsTab;
