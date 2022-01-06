import {StyledTitle} from './Title.styled';

const Title = (props: any) => {
  const {children, ...rest} = props;

  return <StyledTitle {...rest}>{children}</StyledTitle>;
};

export default Title;
