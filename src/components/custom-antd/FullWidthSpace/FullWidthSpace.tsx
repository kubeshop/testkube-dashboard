import {FullWidthSpaceProps, StyledSpace} from './FullWidthSpace.styled';

const FullWidthSpace: React.FC<FullWidthSpaceProps> = props => {
  const {justify = 'flex-start', ...rest} = props;

  return <StyledSpace justify={justify} {...rest} />;
};

export default FullWidthSpace;
