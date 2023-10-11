import {SingleValueProps, components} from 'react-select';

import SplitLabelText from '@atoms/SplitLabelText';

import {Option} from '@models/form';

const CustomSingleValue = (props: SingleValueProps<Option>) => {
  const {children} = props;
  return (
    <components.SingleValue {...props}>
      <SplitLabelText value={String(children)} />
    </components.SingleValue>
  );
};

export default CustomSingleValue;
