import {ReactComponent as LockedIcon} from '@assets/lockedIcon.svg';

import {Button, Text} from '@custom-antd';

import {Execution} from '@models/execution';

import Colors from '@styles/Colors';

import {AiInsightContainer, AiInsightContent} from './AiInsightsTab.styled';

interface AiInsightsTabProps {
  execution: Execution;
  test: any;
}

const AiInsightsTab = () => {
  return (
    <AiInsightContainer>
      <AiInsightContent>
        <LockedIcon />
        <Text className="big bold"> This feature is available only in Testkube Cloud.</Text>
        <Text color={Colors.slate400}>
          Start using Testkube Cloud to get AI insights for your test executions. Learn more
        </Text>
        <Button type="primary" onClick={() => {}}>
          Go to Testkube Cloud
        </Button>
      </AiInsightContent>
    </AiInsightContainer>
  );
};

export default AiInsightsTab;
