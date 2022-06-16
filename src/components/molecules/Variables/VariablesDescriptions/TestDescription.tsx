import {StyledBoldDescription, StyledDescriptionText} from './VariablesDescriptions.styled';

const TestDescription = () => {
  return (
    <StyledDescriptionText>
      Set variables for this Test, these can be edited at run time.
      <br />
      <StyledBoldDescription>Note:</StyledBoldDescription> Variables defined at a Test Suite level will override those
      defined at a Test level.
    </StyledDescriptionText>
  );
};

export default TestDescription;
