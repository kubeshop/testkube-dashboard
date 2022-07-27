import {useContext} from 'react';

import {ExecutionStatuses} from '@models/executions';
import {TestSuiteExecutionStatusesEnum} from '@models/testSuiteExecutions';

import {ExecutionStepIcon} from '@molecules';

import {DashboardInfoPanelSecondLevelContext} from '@contexts';

import {StyledExecutionStatus, StyledExecutionStatusContainer} from '../ExecutionDetails.styled';

const TestSuiteExecutionDetailsHeader: React.FC = () => {
  const {data} = useContext(DashboardInfoPanelSecondLevelContext);

  const {status} = data;

  return (
    <StyledExecutionStatusContainer>
      <ExecutionStepIcon icon={status} />
      {status ? (
        <StyledExecutionStatus status={status}>
          {TestSuiteExecutionStatusesEnum[status as ExecutionStatuses]}
        </StyledExecutionStatus>
      ) : null}
    </StyledExecutionStatusContainer>
  );
};

export default TestSuiteExecutionDetailsHeader;
