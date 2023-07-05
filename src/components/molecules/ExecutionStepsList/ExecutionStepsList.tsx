import {memo, useContext, useMemo} from 'react';

import {ClockCircleOutlined} from '@ant-design/icons';

import classNames from 'classnames';

import {ExecutorIcon, StatusIcon} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {TestSuiteStepExecutionResult} from '@models/testSuite';

import {ExecutionName} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {setRedirectTarget} from '@redux/reducers/configSlice';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {
  ExecutionStepsListContainer,
  ExecutionStepsListItem,
  ExecutionStepsListItemExecution,
  StyledExternalLinkIcon,
  StyledSpace,
} from './ExecutionStepsList.styled';

type IconSet = 'default' | 'definition';

type ExecutionStepsListProps = {
  executionSteps: TestSuiteStepExecutionResult[];
  iconSet?: IconSet;
};

const ExecutionStepsList: React.FC<ExecutionStepsListProps> = props => {
  const {executionSteps, iconSet = 'default'} = props;

  const {dispatch} = useContext(MainContext);
  const {navigate} = useContext(DashboardContext);

  const executors = useAppSelector(selectExecutors);

  const onShowClick = (step: TestSuiteStepExecutionResult & {executionName?: string}) => {
    const {executionName, step: executeStep, execute} = step;

    if ('execute' in executeStep) {
      if (iconSet === 'default') {
        dispatch(
          setRedirectTarget({
            targetTestId: executionName,
            targetTestExecutionId: execute[0].execution.id,
          })
        );
      } else if (iconSet === 'definition') {
        dispatch(
          setRedirectTarget({
            targetTestId: executionName,
            targetTestExecutionId: null,
          })
        );
      }

      return navigate(`/tests/executions/${execute[0].step.test}/execution/${execute[0].execution.id}`);
    }
  };

  const elements = useMemo(() => {
    return executionSteps?.map(step => {
      const groupKey = step.execute.map(item => item.execution?.id || Math.random()).join('-');

      const items = step.execute
        .map(({execution}, index) => {
          const result = step.step.execute[index];
          const status = execution.executionResult?.status;
          const icon = iconSet === 'definition' ? 'code' : status;
          if (result.delay) {
            return {
              icon,
              status,
              clickable: false,
              content: (
                <>
                  <ClockCircleOutlined style={{fontSize: '26px'}} />
                  <ExecutionName name={`Delay - ${result.delay}`} />
                  <div />
                </>
              ),
            };
          }
          if (result.test) {
            const stepIcon = getTestExecutorIcon(executors, execution.testType);
            const clickable = (status !== 'queued' && iconSet === 'default') || iconSet === 'definition';
            return {
              icon,
              executionName: execution.name,
              status,
              clickable,
              content: (
                <>
                  <ExecutorIcon type={stepIcon} />
                  <ExecutionName name={result.test!} />
                  {clickable ? <StyledExternalLinkIcon /> : <div />}
                </>
              ),
            };
          }
          return {icon, status, clickable: false, content: null};
        })
        .filter(x => x.content)
        .map(({icon, executionName, status, content, clickable}, index) => (
          <ExecutionStepsListItemExecution
            // eslint-disable-next-line react/no-array-index-key
            key={`item-${index}`}
            className={classNames({clickable})}
            onClick={clickable ? () => onShowClick({...step, executionName}) : undefined}
          >
            <StyledSpace size={15}>
              {icon ? <StatusIcon status={status} /> : null}
              {content}
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
