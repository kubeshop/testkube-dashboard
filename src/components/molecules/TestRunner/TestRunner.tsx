import {testRunnerIcons, testRunnersNames} from '@constants/testRunners';

import {TestType} from '@models/tests';

import {TestRunnerIcon, Title} from '@atoms';

import {StyledTestRunnerContainer} from './TestRunner.styled';

type TestRunnerProps = {
  testType: TestType;
};

const TestRunner: React.FC<TestRunnerProps> = props => {
  const {testType} = props;

  return (
    <StyledTestRunnerContainer>
      <TestRunnerIcon icon={testRunnerIcons[testType]} />
      <Title level={5}>{testRunnersNames[testType]}</Title>
    </StyledTestRunnerContainer>
  );
};

export default TestRunner;
