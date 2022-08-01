import React from 'react';

import {ClockCircleOutlined, DeleteOutlined} from '@ant-design/icons';

import {TestExecutor} from '@models/testExecutors';

import {TestRunnerIcon} from '@atoms';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledContainer, StyledIconsWrapper, StyledNameContainer} from './TestSuiteStepCard.styled';

type TestSuiteStepCardProps = {
  execute?: any;
  delay?: any;
  onDelete: (index: number) => void;
  index: number;
  isDragging?: boolean;
};

const TestSuiteStepCard: React.FC<TestSuiteStepCardProps> = props => {
  const {execute, delay, onDelete, index, isDragging} = props;

  let name = '';
  let type = '';

  if (delay) {
    name = `${delay.duration}ms`;
    type = 'delay';
  }

  if (execute) {
    name = execute.name;
    type = execute.type;
  }

  return (
    <StyledContainer isDragging={isDragging}>
      {type === 'delay' ? <ClockCircleOutlined /> : <TestRunnerIcon icon={type as TestExecutor} />}
      <StyledNameContainer>
        <Text color={Colors.slate200}>{name}</Text>
      </StyledNameContainer>
      <StyledIconsWrapper>
        <DeleteOutlined onClick={() => onDelete(index)} />
      </StyledIconsWrapper>
    </StyledContainer>
  );
};

export default React.memo(TestSuiteStepCard);
