import {useNavigate} from 'react-router-dom';

import {v4} from 'uuid';

import {ExecutionName} from '@molecules';

import ExecutionStepIcon from '../ExecutionStepIcon';
import {
  StyledExecutionStepsList,
  StyledExecutionStepsListItem,
  StyledExternalLinkIcon,
  StyledSpace,
} from './ExecutionStepsList.styled';

type IconSet = 'default' | 'definition';

type ExecutionStepsListProps = {
  executionSteps: Array<any>;
  iconSet?: IconSet;
};

const ExecutionStepsList: React.FC<ExecutionStepsListProps> = props => {
  const {executionSteps, iconSet = 'default'} = props;

  const navigate = useNavigate();

  const getExecutionStepIcon = (step: any) => {
    if (iconSet === 'definition') {
      if (step.delay) {
        return 'pending';
      }

      return 'code';
    }

    const {execution} = step;
    const {executionResult} = execution;
    const {status} = executionResult;

    if (!status) {
      return 'pending';
    }

    return status;
  };

  const getExecutionStepName = (step: any) => {
    if (iconSet === 'definition') {
      return step.execute?.name;
    }

    if (step.step?.execute) {
      return step.step.execute.name;
    }
  };

  const onShowTestClick = (testName: string) => {
    return navigate(`/dashboard/tests?textSearch=${testName}`);
  };

  const renderedDefinitionsList = executionSteps?.map((step: any) => {
    const icon = getExecutionStepIcon(step);
    const executionName = getExecutionStepName(step);

    const {execute, delay, step: stepResult, execution: execitionResult} = step;

    const listItemKey = execitionResult?.id || v4();

    // TODO: improve this
    return (
      <StyledExecutionStepsListItem key={listItemKey}>
        <StyledSpace size={15}>
          <ExecutionStepIcon icon={icon} />
          {execute || stepResult?.execute ? (
            <>
              <ExecutionName name={executionName} />
              <StyledExternalLinkIcon
                onClick={() => {
                  if (executionName) {
                    onShowTestClick(executionName);
                  }
                }}
              />
            </>
          ) : null}
          {delay || stepResult?.delay ? (
            <>
              <ExecutionName name={`Wait for ${delay?.duration || stepResult?.delay?.duration} ms`} />
              <div />
            </>
          ) : null}
        </StyledSpace>
      </StyledExecutionStepsListItem>
    );
  });

  return <StyledExecutionStepsList>{renderedDefinitionsList}</StyledExecutionStepsList>;
};

export default ExecutionStepsList;
