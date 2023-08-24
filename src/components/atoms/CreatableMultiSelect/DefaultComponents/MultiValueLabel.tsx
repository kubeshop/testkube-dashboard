import {MultiValueGenericProps, components} from 'react-select';

import type {Option} from '@models/form';

export const MultiValueLabel = (props: MultiValueGenericProps<Option>) => {
  return <components.MultiValueLabel {...props} />;
};
