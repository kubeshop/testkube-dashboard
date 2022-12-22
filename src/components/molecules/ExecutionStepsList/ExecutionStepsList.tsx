import {useContext, useMemo} from 'react';

import {nanoid} from '@reduxjs/toolkit';

import {TestSuiteStepExecutionResult} from '@models/testSuite';

import {setRedirectTarget} from '@redux/reducers/configSlice';

import {Icon, StatusIcon, TestRunnerIcon} from '@atoms';

import {ExecutionName} from '@molecules';

import {MainContext} from '@contexts';

import {
  StyledExecutionStepsList,
  StyledExecutionStepsListItem,
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

  const {dispatch, navigate} = useContext(MainContext);

  const getExecutionStepIcon = (step: TestSuiteStepExecutionResult) => {
    if (iconSet === 'definition') {
      return 'code';
    }

    const {execution} = step;
    const {executionResult} = execution;
    const {status} = executionResult;

    return status;
  };

  const getExecutionStepName = (step: TestSuiteStepExecutionResult) => {
    return step.execution.name;
  };

  const onShowClick = (step: TestSuiteStepExecutionResult & {executionName: string}) => {
    const {
      executionName,
      step: {execute},
      execution: {id},
    } = step;

    if (!id) {
      dispatch(
        setRedirectTarget({
          targetTestId: executionName,
          targetTestExecutionId: null,
        })
      );
      return navigate(`/tests/executions/${execute?.name}`);
    }

    if (iconSet === 'default') {
      dispatch(
        setRedirectTarget({
          targetTestId: executionName,
          targetTestExecutionId: id,
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

    return navigate(`/tests/executions/${execute?.name}/execution/${id}`);
  };

  const renderedDefinitionsList = useMemo(() => {
    return executionSteps?.map(step => {
      const icon = getExecutionStepIcon(step);
      const executionName = getExecutionStepName(step);

      const {step: stepResult, execution} = step;
      const {execute} = stepResult;
      const {
        executionResult: {status},
        testType,
      } = execution;

      const listItemKey = execution?.id || nanoid();

      // TODO: improve this
      return (
        <StyledExecutionStepsListItem
          key={listItemKey}
          className="clickable"
          onClick={() => {
            onShowClick({...step, executionName});
          }}
        >
          <StyledSpace size={15}>
            {icon ? <StatusIcon status={status} /> : null}
            {execute || stepResult?.execute ? (
              <>
                <TestRunnerIcon icon={testType} />
                <ExecutionName name={executionName || step.step.execute?.name || ''} />
                <StyledExternalLinkIcon />
              </>
            ) : null}
            {stepResult.delay ? (
              <>
                <Icon name="delay" style={{width: 22, height: 20}} />
                <ExecutionName name={`Delay - ${stepResult.delay?.duration}ms`} />
                <div />
              </>
            ) : null}
          </StyledSpace>
        </StyledExecutionStepsListItem>
      );
    });
  }, [executionSteps]);

  return <StyledExecutionStepsList>{renderedDefinitionsList}</StyledExecutionStepsList>;
};

export default ExecutionStepsList;
