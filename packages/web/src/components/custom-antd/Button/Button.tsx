import {AntdCustomStyledButton, ICustomButtonProps} from './Button.styled';

const Button: React.FC<ICustomButtonProps> = ({hidden = false, $withPadding = true, ...props}) => {
  return !hidden ? <AntdCustomStyledButton {...props} $withPadding={$withPadding} /> : <></>;
};

export default Button;
