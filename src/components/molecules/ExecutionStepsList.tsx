import {FC, memo, useContext, useMemo} from 'react';

import {ClockCircleOutlined} from '@ant-design/icons';

import classNames from 'classnames';

import {ExecutorIcon} from '@atoms/ExecutorIcon';
import {StatusIcon} from '@atoms/StatusIcon';

import {DashboardContext} from '@contexts/DashboardContext';

import type {TestSuiteStepExecutionResult} from '@models/testSuite';

import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {useExecutorsPick} from '@store/executors';

import {ExecutionName} from './ExecutionName';
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

export const ExecutionStepsList: FC<ExecutionStepsListProps> = memo(props => {
  const {executionSteps} = props;

  const {navigate} = useContext(DashboardContext);

  const {executors = []} = useExecutorsPick('executors');

  const elements = useMemo(() => {
    return executionSteps
      ?.filter(step => step.execute?.length)
      .map(step => {
        const groupKey = step.execute.map(item => item.execution?.id || Math.random()).join('-');

        const items = step.execute
          .map(({execution}, index) => ({execution, result: step.step.execute[index]}))
          .filter(({result}) => result.delay || result.test)
          .map(({execution, result}) => {
            const status = execution.executionResult?.status;
            if (result.delay) {
              return {
                status,
                icon: <ClockCircleOutlined style={{fontSize: '26px'}} />,
                name: `Delay - ${result.delay}`,
                url: null,
              };
            }
            return {
              status,
              icon: <ExecutorIcon type={getTestExecutorIcon(executors, execution.testType)} />,
              name: result.test!,
              url:
                status !== 'queued' && status !== 'aborted'
                  ? execution?.id
                    ? `/tests/${result.test}/executions/${execution.id}`
                    : `/tests/${result.test}`
                  : null,
            };
          })
          .map(({status, icon, name, url}, index) => (
            <ExecutionStepsListItemExecution
              // eslint-disable-next-line react/no-array-index-key
              key={`item-${index}`}
              className={classNames({clickable: url})}
              onClick={url ? () => navigate(url) : undefined}
            >
              <StyledSpace size={15}>
                {status ? <StatusIcon status={status} /> : null}
                {icon}
                <ExecutionName name={name} />
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
});
