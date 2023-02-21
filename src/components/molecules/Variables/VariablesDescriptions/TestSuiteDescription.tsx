import {StyledDescriptionText, StyledLink} from './VariablesDescriptions.styled';

const learnMoreLink = 'https://kubeshop.github.io/testkube/concepts/tests/tests-running/#passing-parameters';

const TestSuiteDescription = () => {
  return (
    <>
      <StyledDescriptionText>
        Define variables for this Test Suite. Test Suite variables will override those defined at a Test level.
      </StyledDescriptionText>
      <StyledLink onClick={() => window.open(learnMoreLink, '_blank')}>Learn more</StyledLink>
    </>
  );
};

export default TestSuiteDescription;
