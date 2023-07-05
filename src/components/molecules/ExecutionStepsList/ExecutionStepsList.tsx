import {FC, memo, useContext, useMemo} from 'react';

import {ClockCircleOutlined} from '@ant-design/icons';

import classNames from 'classnames';

import {ExecutorIcon, StatusIcon} from '@atoms';

import {DashboardContext} from '@contexts';

import {TestSuiteStepExecutionResult} from '@models/testSuite';

import {ExecutionName} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {
  ExecutionStepsListContainer,
  ExecutionStepsListItem,
  ExecutionStepsListItemExecution,
  StyledExternalLinkIcon,
  StyledSpace,
} from './ExecutionStepsList.styled';

type ExecutionStepsListProps = {
  executionSteps: TestSuiteStepExecutionResult[];
};

const ExecutionStepsList: FC<ExecutionStepsListProps> = props => {
  const {executionSteps} = props;

  const {navigate} = useContext(DashboardContext);

  const executors = useAppSelector(selectExecutors);

  const elements = useMemo(() => {
    return executionSteps?.map(step => {
      const groupKey = step.execute.map(item => item.execution?.id || Math.random()).join('-');

      const items = step.execute
        .map(({execution}, index) => {
          const result = step.step.execute[index];
          const status = execution.executionResult?.status;
          if (result.delay) {
            return {
              status,
              url: null,
              content: (
                <>
                  <ClockCircleOutlined style={{fontSize: '26px'}} />
                  <ExecutionName name={`Delay - ${result.delay}`} />
                </>
              ),
            };
          }
          if (result.test) {
            const stepIcon = getTestExecutorIcon(executors, execution.testType);
            return {
              status,
              url: status !== 'queued'
                ? execution?.id
                  ? `/tests/executions/${result.test}/execution/${execution.id}`
                  : `/tests/executions/${result.test}`
                : null,
              content: (
                <>
                  <ExecutorIcon type={stepIcon} />
                  <ExecutionName name={result.test!} />
                </>
              ),
            };
          }
          return {url: null, status, clickable: false, content: null};
        })
        .filter(x => x.content)
        .map(({url, status, content}, index) => (
          <ExecutionStepsListItemExecution
            // eslint-disable-next-line react/no-array-index-key
            key={`item-${index}`}
            className={classNames({clickable: url})}
            onClick={url ? () => navigate(url) : undefined}
          >
            <StyledSpace size={15}>
              {status ? <StatusIcon status={status} /> : null}
              {content}
              {url ? <StyledExternalLinkIcon /> : <div />}
            </StyledSpace>
          </ExecutionStepsListItemExecution>
        ));

      return (
        <li key={groupKey}>
          <ExecutionStepsListItem>{items}</ExecutionStepsListItem>
        </li>
      );
    });
  }, [executionSteps]);

  return <ExecutionStepsListContainer>{elements}</ExecutionStepsListContainer>;
};

export default memo(ExecutionStepsList);
