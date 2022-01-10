import {testRunnerIcons, testRunnersNames} from '@constants/testRunners';

import {ScriptType} from '@models/scripts';

import {TestRunnerIcon, Title} from '@atoms';

import {StyledTestRunnerContainer} from './TestRunner.styled';

type TestRunnerProps = {
  scriptType: ScriptType;
};

const TestRunner: React.FC<TestRunnerProps> = props => {
  const {scriptType} = props;

  return (
    <StyledTestRunnerContainer>
      <Title level={5}>{testRunnersNames[scriptType]}</Title>
      <TestRunnerIcon icon={testRunnerIcons[scriptType]} />
    </StyledTestRunnerContainer>
  );
};

export default TestRunner;
