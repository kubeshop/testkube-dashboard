import {testExecutorsNames} from '@constants/testExecutors';

import {TestExecutor} from '@models/testExecutors';

import {TestRunnerIcon} from '@atoms';

import {Title} from '@custom-antd';

import {StyledTestRunnerContainer} from './TestRunner.styled';

type TestRunnerProps = {
  testType: TestExecutor;
};

const TestRunner: React.FC<TestRunnerProps> = props => {
  const {testType} = props;

  const testExecutorTitle = testExecutorsNames[testType] || testExecutorsNames.unknown;

  return (
    <StyledTestRunnerContainer>
      <TestRunnerIcon icon={testType || 'unknown'} />
      <Title className="test-runner-name" level={5}>
        {testExecutorTitle}
      </Title>
    </StyledTestRunnerContainer>
  );
};

export default TestRunner;
