import React, {useEffect, useState} from 'react';

import {
  StyledPlainTextOutputContainer,
  StyledTestOutput,
  StyledText,
} from '../ExecutionResultsOutputs/ExecutionResultsOutputs.styled';

const Logs: React.FC<any> = props => {
  const {output, executionId} = props;

  const [logsValue, setLogs] = useState('');

  useEffect(() => {
    if (!output) {
      const sse = new EventSource(`${localStorage.getItem('apiEndpoint')}/executions/${executionId}/logs`);

      sse.onmessage = e => {
        setLogs(e.data);
      };

      return () => {
        sse.close();
      };
    }

    setLogs(output);
  }, [output]);

  return (
    <>
      <StyledPlainTextOutputContainer>
        <StyledTestOutput>{logsValue && <StyledText>{logsValue}</StyledText>}</StyledTestOutput>
      </StyledPlainTextOutputContainer>
    </>
  );
};

export default Logs;
