import {SpinProps} from 'antd';

import {StyledAntdSpin} from './Loader.styled';

type LoaderProps = SpinProps & {
  isCentered?: boolean;
};

const Loader: React.FC<LoaderProps> = props => {
  const {isCentered = true, ...rest} = props;

  return <StyledAntdSpin isCentered={isCentered} {...rest} />;
};

export default Loader;
