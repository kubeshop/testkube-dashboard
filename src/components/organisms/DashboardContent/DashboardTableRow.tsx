import {ExecutionStatuses} from '@models/executions';
import {TestSuiteExecutionStatusesEnum} from '@models/testSuiteExecutions';

import {ExecutionStepIcon, LabelsList} from '@molecules';

import {
  StyledDashboardTableRow,
  StyledExecutionStatus,
  StyledTableRowLeftPartContainer,
  StyledTableRowRightPartContainer, // StyledTableRowRightPartContainer,
  StyledTableRowTitle,
} from './DashboardContent.styled';

const DashboardTableRow: React.FC<any> = props => {
  const {name, labels, status, recentDate, latestExecution} = props;

  return (
    <StyledDashboardTableRow>
      <StyledTableRowLeftPartContainer isNameOnly={!labels}>
        <StyledTableRowTitle>{name}</StyledTableRowTitle>
        {labels ? <LabelsList labels={labels} shouldSkipLabels /> : null}
      </StyledTableRowLeftPartContainer>
      <StyledTableRowRightPartContainer>
        {status ? (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
            <ExecutionStepIcon icon={status} />
            <StyledExecutionStatus status={status}>
              {TestSuiteExecutionStatusesEnum[status as ExecutionStatuses]}
            </StyledExecutionStatus>
          </div>
        ) : null}
        {recentDate ? (
          <div style={{textAlign: 'right', color: 'white', fontSize: 14, marginTop: 10}}>
            {status === 'running' ? 'In progress' : recentDate}
          </div>
        ) : null}
      </StyledTableRowRightPartContainer>
    </StyledDashboardTableRow>
  );
};

export default DashboardTableRow;
