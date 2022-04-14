import {testRunnersNames} from '@constants/testRunners';

import {TestType} from '@models/tests';

import {TestRunnerIcon} from '@atoms';

import {Title} from '@custom-antd';

import {StyledTestRunnerContainer} from './TestRunner.styled';

type TestRunnerProps = {
  testType: TestType;
};

const TestRunner: React.FC<TestRunnerProps> = props => {
  const {testType} = props;

  return (
    <StyledTestRunnerContainer>
      <TestRunnerIcon icon={testType || 'unknown'} />
      <Title className="test-runner-name" level={5}>{testRunnersNames[testType] || testRunnersNames.unknown}</Title>
    </StyledTestRunnerContainer>
  );
};

export default TestRunner;
