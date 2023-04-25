import React from 'react';

import {ClockCircleOutlined, DeleteOutlined} from '@ant-design/icons';

import {ExecutorIcon} from '@atoms';

import {Text} from '@custom-antd';

import Colors from '@styles/Colors';

import {StyledContainer, StyledIconsWrapper, StyledNameContainer} from './TestSuiteStepCard.styled';

type TestSuiteStepCardProps = {
  execute?: any;
  delay?: any;
  onDelete: (index: number) => void;
  index: number;
  isDragging?: boolean;
  disabled?: boolean;
};

const TestSuiteStepCard: React.FC<TestSuiteStepCardProps> = props => {
  const {execute, delay, onDelete, index, isDragging, disabled = false} = props;

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
    <StyledContainer $disabled={disabled} $isDragging={isDragging}>
      {type === 'delay' ? <ClockCircleOutlined /> : <ExecutorIcon type={type} />}
      <StyledNameContainer>
        <Text className="regular" color={Colors.slate200}>{name}</Text>
      </StyledNameContainer>
      {disabled ? null : (
        <StyledIconsWrapper>
          <DeleteOutlined onClick={() => onDelete(index)} />
        </StyledIconsWrapper>
      )}
    </StyledContainer>
  );
};

export default React.memo(TestSuiteStepCard);
