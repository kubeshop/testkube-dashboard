import {useNavigate} from 'react-router-dom';

import useElementSize from '@hooks/useElementSize';

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

  const [ref, size] = useElementSize();

  const isSVGVisible = size.width > 190;
  return (
    <StyledEmptyTestsDataContainer ref={ref} isSVGVisible={isSVGVisible}>
      {isSVGVisible ? <AddTestImage /> : null}
      <StyledTitle isSVGVisible={isSVGVisible}>Add a test in a few easy steps.</StyledTitle>
      <StyledDescription>
        Simply define your test, add any variables, execute it and view the results!
      </StyledDescription>
      <StyledButtonContainer>
        <StyledLearnMoreButton onClick={() => window.open('https://kubeshop.github.io/testkube/', '_blank')}>
          Learn more
        </StyledLearnMoreButton>
        <StyledAddTestButton onClick={() => navigate('/dashboard/tests/add-test')}>Add Test</StyledAddTestButton>
      </StyledButtonContainer>
    </StyledEmptyTestsDataContainer>
  );
};

export default EmptyTestsDataContent;
