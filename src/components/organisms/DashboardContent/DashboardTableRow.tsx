import {testRunnerIcons} from '@constants/testRunners';

import {DashboardBlueprintType} from '@models/dashboard';
import {ExecutionStatuses} from '@models/executions';
import {LabelsObject} from '@models/labels';
import {TestSuiteExecutionStatus, TestSuiteExecutionStatusesEnum} from '@models/testSuiteExecutions';
import {TestType} from '@models/tests';

import {TestRunnerIcon} from '@atoms';

import {ExecutionStepIcon, LabelsList} from '@molecules';

import useIsRunning from '@hooks/useIsRunning';

import {
  RecentDateContainer,
  StatusContainer,
  StyledDashboardTableRow,
  StyledExecutionStatus,
  StyledTableRowLeftPartContainer,
  StyledTableRowRightPartContainer, // StyledTableRowRightPartContainer,
  StyledTableRowTitle,
  StyledTestRunnerType,
} from './DashboardContent.styled';

type DashboardTableRowProps = {
  latestExecution: {
    testType: TestType;
  };
  labels: LabelsObject;
  recentDate: string;
  name: string;
  status: TestSuiteExecutionStatus;
  entityType: DashboardBlueprintType;
  type: any;
};

const DashboardTableRow: React.FC<DashboardTableRowProps> = props => {
  const {name, labels, status, recentDate, latestExecution, entityType, type} = props;

  const isRunning = useIsRunning(status);

  return (
    <StyledDashboardTableRow>
      {entityType === 'tests' ? (
        <StyledTestRunnerType>
          <TestRunnerIcon icon={testRunnerIcons[latestExecution?.testType || type] || testRunnerIcons.unknown} />
        </StyledTestRunnerType>
      ) : null}
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
