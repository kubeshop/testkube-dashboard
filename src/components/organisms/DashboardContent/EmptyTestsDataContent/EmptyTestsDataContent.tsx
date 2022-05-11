import {useNavigate} from 'react-router-dom';

import {ReactComponent as AddTestImage} from '@assets/addTest.svg';

import {
  StyledAddTestButton,
  StyledButtonContainer,
  StyledDescription,
  StyledEmptyTestsDataContainer,
  StyledLearnMoreButton,
  StyledTitle,
} from './EmptyTestsDataContent.styled';

const EmptyTestsDataContent = () => {
  const navigate = useNavigate();
  return (
    <StyledEmptyTestsDataContainer>
      <AddTestImage />
      <StyledTitle>Add a test in a few easy steps.</StyledTitle>
      <StyledDescription>
        Simply define your test, add any variables, execute it and view the results!
      </StyledDescription>
      <StyledButtonContainer>
        <StyledLearnMoreButton onClick={() => window.open('https://kubeshop.github.io/testkube/', '_blank')}>
          Learn more
        </StyledLearnMoreButton>
        <StyledAddTestButton onClick={() => navigate('/dashboard/tests/create')}>Add Test</StyledAddTestButton>
      </StyledButtonContainer>
    </StyledEmptyTestsDataContainer>
  );
};

export default EmptyTestsDataContent;
