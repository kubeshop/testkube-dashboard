import {RadioGroupProps} from 'antd';

import { AntdCustomStyledRadioGroup } from './RadioGroup.styled';

const RadioGroup: React.FC<RadioGroupProps> = props => {
  const {children, ...rest} = props;

  return (
    <AntdCustomStyledRadioGroup {...props}>
      {children}
    </AntdCustomStyledRadioGroup>
  );
};

export default RadioGroup;
