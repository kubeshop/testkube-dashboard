import {SpinProps} from 'antd';

import {StyledAntdSpin} from './Loader.styled';

type LoaderProps = SpinProps;

const Loader: React.FC<LoaderProps> = props => {
  return <StyledAntdSpin {...props} />;
};

export default Loader;
