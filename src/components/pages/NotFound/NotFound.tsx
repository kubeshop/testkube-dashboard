import {StyledNotFoundContainer, StyledNotFoundTitle} from './NotFound.styled';

const NotFound: React.FC = () => {
  return (
    <StyledNotFoundContainer>
      <StyledNotFoundTitle className="not-found-title">This page does not exist</StyledNotFoundTitle>
    </StyledNotFoundContainer>
  );
};

export default NotFound;
