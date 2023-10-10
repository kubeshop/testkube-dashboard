import {MultiValueGenericProps, components} from 'react-select';

import {Option} from '@models/form';

const MultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  return <components.MultiValueLabel {...props} />;
};

export default MultiValueLabel;
