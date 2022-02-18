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
      <Title level={5}>{testRunnersNames[testType]}</Title>
      <TestRunnerIcon icon={testRunnerIcons[testType]} />
    </StyledTestRunnerContainer>
  );
};

export default TestRunner;
