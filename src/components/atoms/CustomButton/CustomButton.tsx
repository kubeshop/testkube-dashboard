import {ButtonProps} from 'antd';

import {StyledAntdButton} from './CustomButton.styled';

const CustomButton: React.FC<ButtonProps & React.RefAttributes<HTMLElement>> = props => {
  return <StyledAntdButton {...props} />;
};

export default CustomButton;
