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
        <Text color={Colors.slate400}>
          Please enable AI Hints for your organization in order to access this feature. Learn more
        </Text>
        <Button type="primary" onClick={() => {}}>
          Enable AI Hints
        </Button>
      </AiInsightContent>
    </AiInsightContainer>
  );
};

export default AiInsightsTab;
