import {StyledPre} from './Pre.styled';

type PreProps = {
  children: any;
};

const Pre: React.FC<PreProps> = props => {
  const {children} = props;

  return <StyledPre>{children}</StyledPre>;
};

export default Pre;
