import {AntdCustomStyledButton, ICustomButtonProps} from './Button.styled';

const Button: React.FC<ICustomButtonProps> = props => {
  return <AntdCustomStyledButton {...props} />;
};

export default Button;
