import {FC} from 'react';

import {AntdCustomStyledButton, ICustomButtonProps} from './Button.styled';

export const Button: FC<ICustomButtonProps> = ({hidden = false, $withPadding = true, ...props}) => {
  return !hidden ? <AntdCustomStyledButton {...props} $withPadding={$withPadding} /> : <></>;
};
