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

  const formattedStartTime = formatExecutionDate(startTime);
  const formattedEndTime = endTime !== '0001-01-01T00:00:00Z' ? formatExecutionDate(endTime) : 'In progress';
  const formattedDuration = duration || 'In progress';

  return (
    <StyledExecutionDetailsGeneralInfoContainer>
      {entityType === 'test-suites' ? <TestSuiteExecutionDetailsHeader /> : null}
      <StyledGeneralInfoGrid>
        {entityType === 'tests' ? <TestExecutionDetailsHeader /> : null}
        <StyledGeneralInfoLabel>Start</StyledGeneralInfoLabel>
        <StyledGeneralInfoValue>{formattedStartTime}</StyledGeneralInfoValue>
        <StyledGeneralInfoLabel>End</StyledGeneralInfoLabel>
        <StyledGeneralInfoValue>{formattedEndTime}</StyledGeneralInfoValue>
        <StyledGeneralInfoLabel>Duration</StyledGeneralInfoLabel>
        <StyledGeneralInfoValue>{formattedDuration}</StyledGeneralInfoValue>
      </StyledGeneralInfoGrid>
    </StyledExecutionDetailsGeneralInfoContainer>
  );
};

export default ExecutionDetailsGeneralInfo;
