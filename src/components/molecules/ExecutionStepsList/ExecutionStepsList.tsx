import {memo, useContext, useMemo, useState} from 'react';

import {ClockCircleOutlined} from '@ant-design/icons';

import {nanoid} from '@reduxjs/toolkit';

import classNames from 'classnames';

import {ExecutorIcon, StatusIcon} from '@atoms';

import {DashboardContext, MainContext} from '@contexts';

import {TestSuiteStepExecutionResult} from '@models/testSuite';

import {ExecutionName, NotificationContent} from '@molecules';

import {useAppSelector} from '@redux/hooks';
import {setRedirectTarget} from '@redux/reducers/configSlice';
import {selectExecutors} from '@redux/reducers/executorsSlice';
import {getTestExecutorIcon} from '@redux/utils/executorIcon';

import {
  StyledExecutionStepsList,
  StyledExecutionStepsListItem,
  StyledExternalLinkIcon,
  StyledSpace,
  WarningContainer,
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

  const [isWarning, setIsWarning] = useState(false);

  const getExecutionStepIcon = (step: TestSuiteStepExecutionResult) => {
    if (iconSet === 'definition') {
      return 'code';
    }

    const {execute} = step;
    const {execution} = execute[0];
    const {executionResult} = execution;
    const {status} = executionResult;

    return status;
  };

  const getExecutionStepName = (step: TestSuiteStepExecutionResult) => {
    return step.step.execute[0].test;
  };

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

  const renderedDefinitionsList = useMemo(() => {
    return executionSteps?.map(step => {
      const icon = getExecutionStepIcon(step);
      const executionName = getExecutionStepName(step);

      const {step: stepResult, execute} = step;
      const {execution} = execute[0];
      const {
        executionResult: {status},
        testType,
      } = execution;

      if (execute.length > 1) {
        setIsWarning(true);
      }

      const stepIcon = getTestExecutorIcon(executors, testType);
      const listItemKey = execution?.id || nanoid();
      let isClickable = false;
      let content;

      const delay = stepResult.execute[0].delay;
      const test = stepResult.execute[0].test;

      if (delay) {
        content = (
          <>
            <ClockCircleOutlined style={{fontSize: '26px'}} />
            <ExecutionName name={`Delay - ${delay}`} />
            <div />
          </>
        );
      } else if (test) {
        isClickable =
          (execution?.executionResult.status !== 'queued' && iconSet === 'default') || iconSet === 'definition';

        content = (
          <>
            <ExecutorIcon type={stepIcon} />
            <ExecutionName name={executionName || test || ''} />
            {isClickable ? <StyledExternalLinkIcon /> : <div />}
          </>
        );
      }

      const listItemClassNames = classNames({
        clickable: isClickable,
      });

      // TODO: improve this
      return (
        <StyledExecutionStepsListItem
          key={listItemKey}
          className={listItemClassNames}
          onClick={() => {
            if (isClickable) {
              onShowClick({...step, executionName});
            }
          }}
        >
          <StyledSpace size={15}>
            {icon ? <StatusIcon status={status} /> : null}
            {content}
          </StyledSpace>
        </StyledExecutionStepsListItem>
      );
    });
  }, [executionSteps]);

  return (
    <StyledExecutionStepsList>
      {isWarning ? (
        <WarningContainer>
          <NotificationContent
            status="error"
            title="We do not yet support test suite parallelization, displayed execution result might be wrong"
          />
        </WarningContainer>
      ) : null}
      {renderedDefinitionsList}
    </StyledExecutionStepsList>
  );
};

export default memo(ExecutionStepsList);
