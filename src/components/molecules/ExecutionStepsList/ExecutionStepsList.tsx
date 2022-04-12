/* eslint-disable unused-imports/no-unused-imports-ts */
import {useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import classNames from 'classnames';
import {v4} from 'uuid';

import {setRedirectTarget} from '@redux/reducers/configSlice';

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getExecutionStepIcon = (step: any) => {
    if (iconSet === 'definition') {
      return 'code';
    }

    const {execution} = step;
    const {executionResult} = execution;
    const {status} = executionResult;

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

  const onShowClick = (step: any) => {
    const {executionName} = step;

    if (iconSet === 'default') {
      const {
        execution: {id},
      } = step;

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

    return navigate(`/dashboard/tests?textSearch=${executionName}`);
  };

  const renderedDefinitionsList = useMemo(() => {
    return executionSteps?.map((step: any) => {
      const icon = getExecutionStepIcon(step);
      const executionName = getExecutionStepName(step);

      const {execute, delay, step: stepResult, execution: executionResult} = step;

      const listItemKey = executionResult?.id || v4();

      const isClickable =
        (executionResult?.id && iconSet === 'default') || (iconSet === 'definition' && (!delay || stepResult?.delay));

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
            {icon ? <ExecutionStepIcon icon={icon} /> : null}
            {execute || stepResult?.execute ? (
              <>
                <ExecutionName name={executionName} />
                {executionResult?.id || iconSet === 'definition' ? (
                  <StyledExternalLinkIcon
                    onClick={() => {
                      onShowClick({...step, executionName});
                    }}
                  />
                ) : (
                  <div />
                )}
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
  }, [executionSteps]);

  return <StyledExecutionStepsList>{renderedDefinitionsList}</StyledExecutionStepsList>;
};

export default ExecutionStepsList;
