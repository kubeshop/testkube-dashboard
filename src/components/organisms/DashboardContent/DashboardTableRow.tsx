import classNames from 'classnames';

import {DashboardBlueprintType} from '@models/dashboard';
import {ExecutionStatuses} from '@models/executions';
import {LabelsObject} from '@models/labels';
import {TestExecutor} from '@models/testExecutors';
import {TestSuiteExecutionStatus, TestSuiteExecutionStatusesEnum} from '@models/testSuiteExecutions';

import {TestRunnerIcon} from '@atoms';

import {Text} from '@custom-antd';

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
    testType: TestExecutor;
  };
  labels: LabelsObject;
  recentDate: string;
  name: string;
  status: TestSuiteExecutionStatus;
  entityType: DashboardBlueprintType;
  type: TestExecutor;
  isRowActive?: boolean;
};

const DashboardTableRow: React.FC<DashboardTableRowProps> = props => {
  const {name, labels, status, recentDate, latestExecution, entityType, type, isRowActive = false} = props;

  const isRunning = useIsRunning(status);

  const rowClassNames = classNames({
    'row-active': isRowActive,
  });

  return (
    <StyledDashboardTableRow className={rowClassNames}>
      {entityType === 'tests' ? (
        <StyledTestRunnerType>
          <TestRunnerIcon icon={latestExecution?.testType || type || 'unknown'} />
        </StyledTestRunnerType>
      ) : null}
      <StyledTableRowLeftPartContainer isNameOnly={!labels}>
        <StyledTableRowTitle>{name}</StyledTableRowTitle>
        {labels ? <LabelsList labels={labels} shouldSkipLabels className="labels-list" /> : null}
      </StyledTableRowLeftPartContainer>
      <StyledTableRowRightPartContainer>
        {status ? (
          <StatusContainer className="execution-status-block">
            <ExecutionStepIcon icon={status} />
            <StyledExecutionStatus status={status}>
              {TestSuiteExecutionStatusesEnum[status as ExecutionStatuses]}
            </StyledExecutionStatus>
          </StatusContainer>
        ) : null}
        {recentDate ? (
          <RecentDateContainer>
            <Text>{isRunning ? 'In progress' : recentDate}</Text>
          </RecentDateContainer>
        ) : null}
      </StyledTableRowRightPartContainer>
    </StyledDashboardTableRow>
  );
};

export default DashboardTableRow;
