import {StyledTitle} from './Title.styled';

const Title = (props: any) => {
  const {children} = props;

  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
