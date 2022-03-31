import {ExecutionStatuses} from '@models/executions';
import {TestSuiteExecutionStatusesEnum} from '@models/testSuiteExecutions';

import {ExecutionStepIcon, LabelsList} from '@molecules';

import useIsRunning from '@src/hooks/useIsRunning';

import {
  RecentDateContainer,
  StatusContainer,
  StyledDashboardTableRow,
  StyledExecutionStatus,
  StyledTableRowLeftPartContainer,
  StyledTableRowRightPartContainer, // StyledTableRowRightPartContainer,
  StyledTableRowTitle,
} from './DashboardContent.styled';

const DashboardTableRow: React.FC<any> = props => {
  const {name, labels, status, recentDate} = props;

  const isRunning = useIsRunning(status);

  return (
    <StyledDashboardTableRow>
      <StyledTableRowLeftPartContainer isNameOnly={!labels}>
        <StyledTableRowTitle>{name}</StyledTableRowTitle>
        {labels ? <LabelsList labels={labels} shouldSkipLabels /> : null}
      </StyledTableRowLeftPartContainer>
      <StyledTableRowRightPartContainer>
        {status && (
          <StatusContainer>
            <ExecutionStepIcon icon={status} />
            <StyledExecutionStatus status={status}>
              {TestSuiteExecutionStatusesEnum[status as ExecutionStatuses]}
            </StyledExecutionStatus>
          </StatusContainer>
        )}
        {recentDate && <RecentDateContainer>{isRunning ? 'In progress' : recentDate}</RecentDateContainer>}
      </StyledTableRowRightPartContainer>
    </StyledDashboardTableRow>
  );
};

export default DashboardTableRow;
