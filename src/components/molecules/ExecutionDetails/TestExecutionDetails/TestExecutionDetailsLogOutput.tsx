import {useContext} from 'react';

import {StyledInfoPanelSection} from '@organisms/DashboardInfoPanel/DashboardInfoPanel.styled';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import Logs from '../../Logs/Logs';

const TestExecutionDetailsLogOutput = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);
  const {executionResult} = data;
  const {output} = executionResult;

  return <StyledInfoPanelSection isBorder={false}>{output ? <Logs value={output} /> : null}</StyledInfoPanelSection>;
};

export default TestExecutionDetailsLogOutput;
