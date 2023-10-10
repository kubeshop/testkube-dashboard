import {AntdCustomStyledInput, ICustomInputProps} from './Input.styled';

const Input: React.FC<ICustomInputProps> = props => {
  return <AntdCustomStyledInput {...props} />;
};

export default Input;
