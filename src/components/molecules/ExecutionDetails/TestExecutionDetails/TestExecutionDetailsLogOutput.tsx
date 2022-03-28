import {useContext} from 'react';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import Logs from '../../Logs/Logs';

const TestExecutionDetailsLogOutput = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {executionResult, id, name} = data;
  const {output} = executionResult;

  return (
    <StyledInfoPanelSection isBorder={false}>
      <Logs executionId={name} output={output} />
    </StyledInfoPanelSection>
  );
};

export default TestExecutionDetailsLogOutput;
