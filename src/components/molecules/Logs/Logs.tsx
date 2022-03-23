import React from 'react';

import {
  StyledPlainTextOutputContainer,
  StyledTestOutput,
  StyledText,
} from '../ExecutionResultsOutputs/ExecutionResultsOutputs.styled';

const Logs: React.FC<any> = props => {
  const {value} = props;

  return (
    <>
      <StyledPlainTextOutputContainer>
        <StyledTestOutput>{value && <StyledText>{value}</StyledText>}</StyledTestOutput>
      </StyledPlainTextOutputContainer>
    </>
  );
};

export default Logs;
