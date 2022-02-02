import {useEffect, useState} from 'react';

import {Collapse, Spin, Tabs} from 'antd';

import {nanoid} from '@reduxjs/toolkit';

import {getStatus} from '@redux/utils/requestFilters';

import {RenderTestStatusSvgIcon} from '@atoms';

import {useGetScriptExecutionArtifactsQuery} from '@services/executions';

import {AssertionResult, Step, Test} from '@types';

import Logs from '../Logs/Logs';
import Artifacts from './Artifacts/Artifacts';
import {
  StyledCollapse,
  StyledLabelledFailedOnlyCheckbox,
  StyledPendingTestExecution,
  StyledPlainTextOutputContainer,
  StyledShowFailedStepsContainer,
  StyledTestAssertionResultsContainer,
  StyledTestDescriptionContainer,
  StyledTestOutput,
  StyledTestOutputAssertionErrorMessage,
  StyledTestOutputAssertionName,
  StyledTestOutputNameAndStatus,
  StyledTestStepAssertionContainer,
  StyledTestStepName,
  StyledTestStepNameContainer,
  StyledTestStepsOutPutContainer,
  StyledTestWithoutAssertions,
  StyledText,
  TestsWithoutStepsContainer,
} from './ExecutionResultsOutputs.styled';

const {TabPane} = Tabs;

interface IStepHeader {
  name: string;
  status: string;
}

const RenderPlainTestOutput = (data: Test) => {
  const {executionResult} = data;
  return (
    <StyledPlainTextOutputContainer>
      <StyledTestOutput>
        {data && (
          <StyledText key={nanoid()}>
            <pre>{executionResult?.output}</pre>
          </StyledText>
        )}
      </StyledTestOutput>
    </StyledPlainTextOutputContainer>
  );
};

const RenderTestStepCollapseHeader = ({name, status}: IStepHeader) => {
  return (
    <StyledTestStepNameContainer>
      <RenderTestStatusSvgIcon testStatus={getStatus(status)} width={18} height={18} />
      <StyledTestStepName>{name}</StyledTestStepName>
    </StyledTestStepNameContainer>
  );
};

const RenderTestOutputWithAssertion = (step: Step) => {
  const {name, status, assertionResults} = step;
  return (
    <>
      {step && (
        <Collapse bordered={false} defaultActiveKey={nanoid()} expandIconPosition="right">
          <StyledCollapse header={<RenderTestStepCollapseHeader name={name} status={status} />} key={nanoid()}>
            {assertionResults?.map((assertionResult: AssertionResult) => (
              <StyledTestStepAssertionContainer key={nanoid()}>
                <StyledTestOutputNameAndStatus>
                  <RenderTestStatusSvgIcon testStatus={getStatus(assertionResult.status)} height={18} width={18} />
                  <StyledTestOutputAssertionName>{assertionResult?.name}</StyledTestOutputAssertionName>
                </StyledTestOutputNameAndStatus>

                <StyledTestOutputAssertionErrorMessage>
                  {assertionResult?.errorMessage}
                </StyledTestOutputAssertionErrorMessage>
              </StyledTestStepAssertionContainer>
            ))}
          </StyledCollapse>
        </Collapse>
      )}
    </>
  );
};

const RenderTestWithoutAssertion = (step: Step) => {
  const {name, status} = step;
  return (
    <>
      {step && (
        <StyledTestStepNameContainer>
          <StyledTestWithoutAssertions>
            <RenderTestStatusSvgIcon testStatus={getStatus(status)} width={18} height={18} />
            <StyledTestStepName>{name}</StyledTestStepName>
          </StyledTestWithoutAssertions>
        </StyledTestStepNameContainer>
      )}
    </>
  );
};

const ExecutionResultsOutputs = (props: any) => {
  const {id, executionResult, execution} = props;

  const [showOnlyFailedSteps, setShowOnlyFailedSteps] = useState<boolean>(false);
  const [filteredExecutionResults, setFilteredExecutionResults] = useState<any[]>([]);

  const testExecutionStatus = executionResult.status;

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowOnlyFailedSteps(event.target.checked);
  };

  const {data: artifacts} = useGetScriptExecutionArtifactsQuery(id, {
    pollingInterval: 0,
  });

  useEffect(() => {
    if (showOnlyFailedSteps) {
      if (!execution) {
        const filtered = executionResult?.steps?.filter((step: Step) => {
          return step.status === 'failed' || step.status === 'error';
        });

        setFilteredExecutionResults(filtered);
      } else {
        const filtered = execution?.filter((step: Step) => {
          return step.status === 'failed' || step.status === 'error';
        });

        setFilteredExecutionResults(filtered);
      }
    } else if (!execution) {
      setFilteredExecutionResults(executionResult?.steps);
    } else {
      setFilteredExecutionResults(execution);
    }
  }, [executionResult?.steps, execution, showOnlyFailedSteps]);

  return (
    <StyledTestDescriptionContainer>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Tabs
        style={{width: '100%'}}
        defaultActiveKey="1"
        // onChange={callback}
        tabBarExtraContent={
          <StyledShowFailedStepsContainer>
            <StyledLabelledFailedOnlyCheckbox htmlFor="failed">
              <input
                id="failed"
                type="checkbox"
                name="failed"
                onChange={handleCheckboxChange}
                className="filter-failed-checkbox"
              />
              <span>Show only failed steps</span>
            </StyledLabelledFailedOnlyCheckbox>
          </StyledShowFailedStepsContainer>
        }
      >
        <TabPane tab="Steps" key="1">
          <StyledTestStepsOutPutContainer>
            {filteredExecutionResults ? (
              filteredExecutionResults?.map((step: Step) => (
                <StyledTestAssertionResultsContainer key={nanoid()}>
                  {step.assertionResults && step.assertionResults.length !== 0 ? (
                    <RenderTestOutputWithAssertion {...step} />
                  ) : (
                    <RenderTestWithoutAssertion {...step} />
                  )}
                </StyledTestAssertionResultsContainer>
              ))
            ) : testExecutionStatus === 'pending' ? (
              <StyledPendingTestExecution>
                <span>
                  Pending... <Spin />
                </span>
              </StyledPendingTestExecution>
            ) : (
              <TestsWithoutStepsContainer>
                <span>This Execution has no steps!</span>
              </TestsWithoutStepsContainer>
            )}
          </StyledTestStepsOutPutContainer>
        </TabPane>

        {executionResult && (
          <TabPane tab="Log output" key="2">
            {executionResult.status === 'pending' ? <Logs id={id} /> : <RenderPlainTestOutput {...props} />}
          </TabPane>
        )}
        {artifacts && artifacts.length > 0 ? (
          <TabPane tab={`Artifacts(${artifacts ? artifacts?.length : 0})`} key="Artifacts">
            <Artifacts artifacts={artifacts} testId={id} />
          </TabPane>
        ) : (
          <TabPane tab="Artifacts" key="Artifacts" disabled>
            <Artifacts artifacts={artifacts} testId={id} />
          </TabPane>
        )}
      </Tabs>
    </StyledTestDescriptionContainer>
  );
};

export default ExecutionResultsOutputs;
