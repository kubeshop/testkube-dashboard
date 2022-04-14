import {Button as AntdButton, ButtonProps as AntdButtonProps} from 'antd';

const Button: React.FC<AntdButtonProps> = props => {
  return <AntdButton {...props} />;
};

export default Button;
