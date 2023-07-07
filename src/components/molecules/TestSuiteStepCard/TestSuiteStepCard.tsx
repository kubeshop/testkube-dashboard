import React from 'react';

import {ClockCircleOutlined, DeleteOutlined} from '@ant-design/icons';

import {ExecutorIcon} from '@atoms';

import {Text} from '@custom-antd';

import '@models/testSuite';

import Colors from '@styles/Colors';

import {StyledContainer, StyledIconsWrapper, StyledNameContainer} from './TestSuiteStepCard.styled';

type TestSuiteStepCardProps = {
  test?: string;
  type?: string;
  delay?: string;
  onDelete: (index: number) => void;
  index: number;
  isDragging?: boolean;
  disabled?: boolean;
};

const TestSuiteStepCard: React.FC<TestSuiteStepCardProps> = props => {
  const {test, type, delay, onDelete, index, isDragging, disabled = false} = props;

  let renderName;
  let renderType;

  if (delay) {
    renderName = typeof delay === 'string' ? delay : `${delay}ms`;
    renderType = 'delay';
  } else if (test) {
    renderName = test;
    renderType = type;
  }

  return (
    <StyledContainer $disabled={disabled} $isDragging={isDragging}>
      {renderType === 'delay' ? <ClockCircleOutlined /> : <ExecutorIcon type={renderType} />}
      <StyledNameContainer>
        <Text className="regular" color={Colors.slate200}>
          {renderName}
        </Text>
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
