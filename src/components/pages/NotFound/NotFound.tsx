import {StyledNotFoundContainer, StyledNotFoundTitle} from './NotFound.styled';

const NotFound = () => {
  return (
    <StyledNotFoundContainer>
      <StyledNotFoundTitle className="not-found-title">This page does not exist</StyledNotFoundTitle>
    </StyledNotFoundContainer>
  );
};

export default NotFound;
