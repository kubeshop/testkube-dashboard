import {StyledTitle} from './Title.styled';

const Title = (props: any) => {
  const {children, font, ...rest} = props;

  return (
    <StyledTitle font={font} {...rest}>
      {children}
    </StyledTitle>
  );
};

export default Title;
