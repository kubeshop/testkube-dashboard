import {ReactComponent as LockedIcon} from '@assets/lockedIcon.svg';

import {Button, Text} from '@custom-antd';

import {Execution} from '@models/execution';

import Colors from '@styles/Colors';

import {externalLinks} from '@utils/externalLinks';

import {AiInsightContainer, AiInsightContent} from './AiInsightsTab.styled';

interface AiInsightsTabProps {
  execution: Execution;
  test: any;
}

const AiInsightsTab = () => {
  return (
    <AiInsightContainer>
      <AiInsightContent data-testid="ai-insights-tab-oss">
        <LockedIcon />
        <Text className="big bold"> This feature is available only in Testkube Cloud.</Text>
        <Text color={Colors.slate400}>
          Start using Testkube Cloud to get AI insights for your test executions, as well as other exclusive features.
          <a href={externalLinks.testkubeCloud} target="_blank">
            {' '}
            Learn more
          </a>
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
};

export default AiInsightsTab;
