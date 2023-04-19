import {AntdCustomStyledButton, ICustomButtonProps} from './Button.styled';

const Button: React.FC<ICustomButtonProps> = ({hidden = false, ...props}) => {
  return !hidden ? <AntdCustomStyledButton {...props} /> : <></>;
};

export default Button;
