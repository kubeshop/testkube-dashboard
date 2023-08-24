import {FC} from 'react';

import {CustomCheckbox, CustomCheckboxProps} from './Checkbox.styled';

export const Checkbox: FC<CustomCheckboxProps> = props => {
  return <CustomCheckbox {...props} />;
};
