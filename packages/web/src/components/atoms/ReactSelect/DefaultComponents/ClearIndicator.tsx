import {ClearIndicatorProps, components} from 'react-select';

import {ReactComponent as RemoveIcon} from '@assets/closeCircle.svg';

import {Option} from '@models/form';

const ClearIndicator = (props: ClearIndicatorProps<Option>) => {
  return (
    <components.ClearIndicator {...props}>
      <RemoveIcon width={16} height={16} />
    </components.ClearIndicator>
  );
};

export default ClearIndicator;
