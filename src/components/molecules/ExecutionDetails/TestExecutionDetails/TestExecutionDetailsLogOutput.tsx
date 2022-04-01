import {useContext} from 'react';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import Logs from '../../Logs/Logs';

const TestExecutionDetailsLogOutput = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {executionResult, name} = data;

  return (
    <StyledInfoPanelSection isBorder={false}>
      <Logs executionId={name} output={executionResult?.output} />
    </StyledInfoPanelSection>
  );
};

export default TestExecutionDetailsLogOutput;
