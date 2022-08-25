import {testExecutorsNames} from '@constants/testExecutors';

import {Executor} from '@models/executors';

import {TestRunnerIcon} from '@atoms';

import {Title} from '@custom-antd';

import {StyledTestRunnerContainer} from './TestRunner.styled';

type TestRunnerProps = {
  testType: Executor['name'];
};

const TestRunner: React.FC<TestRunnerProps> = props => {
  const {testType} = props;

  const testExecutorTitle = testExecutorsNames[testType] || testExecutorsNames.unknown;
  const testExecutorIcon = testType || 'unknown';

  return (
    <StyledTestRunnerContainer>
      <TestRunnerIcon icon={testExecutorIcon} />
      <Title className="test-runner-name" level={5}>
        {testExecutorTitle}
      </Title>
    </StyledTestRunnerContainer>
  );
};

export default TestRunner;
