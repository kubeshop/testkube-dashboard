import {useContext} from 'react';

import {DashboardContext} from '@organisms/DashboardContainer/DashboardContainer';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {formatExecutionDate} from '@src/utils/formatDate';

import {
  StyledExecutionDetailsGeneralInfoContainer,
  StyledGeneralInfoGrid,
  StyledGeneralInfoLabel,
  StyledGeneralInfoValue,
} from './ExecutionDetails.styled';
import TestExecutionDetailsHeader from './TestExecutionDetails/TestExecutionDetailsHeader';
import TestSuiteExecutionDetailsHeader from './TestSuiteExecutionDetails/TestSuiteExecutionDetailsHeader';

const ExecutionDetailsGeneralInfo: React.FC = () => {
  const {entityType} = useContext(DashboardContext);
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {startTime, endTime, duration} = data;

  return (
    <StyledExecutionDetailsGeneralInfoContainer>
      {entityType === 'test-suites' ? <TestSuiteExecutionDetailsHeader /> : null}
      <StyledGeneralInfoGrid>
        {entityType === 'tests' ? <TestExecutionDetailsHeader /> : null}
        <StyledGeneralInfoLabel>Start</StyledGeneralInfoLabel>
        <StyledGeneralInfoValue>{formatExecutionDate(startTime)}</StyledGeneralInfoValue>
        <StyledGeneralInfoLabel>End</StyledGeneralInfoLabel>
        <StyledGeneralInfoValue>{formatExecutionDate(endTime)}</StyledGeneralInfoValue>
        <StyledGeneralInfoLabel>Duration</StyledGeneralInfoLabel>
        <StyledGeneralInfoValue>{duration || 'No duration'}</StyledGeneralInfoValue>
      </StyledGeneralInfoGrid>
    </StyledExecutionDetailsGeneralInfoContainer>
  );
};

export default ExecutionDetailsGeneralInfo;
