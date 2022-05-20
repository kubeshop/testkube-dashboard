// import {Link} from 'react-router-dom';
import {StyledDescriptionText, StyledLink} from './Variables.styled';

const learnMoreLink = 'https://kubeshop.github.io/testkube/tests-running/#passing-parameters';

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
