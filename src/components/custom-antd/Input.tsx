import {FC} from 'react';

import {AntdCustomStyledInput, ICustomInputProps} from './Input.styled';

export const Input: FC<ICustomInputProps> = props => {
  return <AntdCustomStyledInput {...props} />;
};
