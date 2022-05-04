import {useContext} from 'react';

import {LogOutput} from '@molecules';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import useIsRunning from '@hooks/useIsRunning';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

const TestExecutionDetailsLogOutput = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {executionResult, name, status} = data;

  const isRunning = useIsRunning(status);

  const logOutput = isRunning ? null : executionResult?.output || executionResult?.errorMessage;

  return (
    <StyledInfoPanelSection isBorder={false}>
      <div style={{height: '500px'}}>
        <LogOutput logOutput={logOutput} executionId={name} />
      </div>
    </StyledInfoPanelSection>
  );
};

export default TestExecutionDetailsLogOutput;
