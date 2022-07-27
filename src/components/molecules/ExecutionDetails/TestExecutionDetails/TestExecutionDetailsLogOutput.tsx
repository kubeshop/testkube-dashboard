import {useContext} from 'react';

import {LogOutput} from '@molecules';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import useIsRunning from '@hooks/useIsRunning';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

const TestExecutionDetailsLogOutput = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {executionResult, name, status} = data;

  const isRunning = useIsRunning(status || executionResult.status);

  const logOutput = executionResult?.output || executionResult?.errorMessage || 'No log output';

  return (
    <StyledInfoPanelSection isBorder={false} containerHeight="500">
      <LogOutput logOutput={logOutput} executionId={name} isRunning={isRunning} />
    </StyledInfoPanelSection>
  );
};

export default TestExecutionDetailsLogOutput;
