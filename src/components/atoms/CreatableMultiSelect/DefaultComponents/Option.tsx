import {OptionProps, components} from 'react-select';

import type {Option} from '@models/form';

export const MultiValueLabel = (props: OptionProps<Option>) => {
  return <components.Option {...props} />;
};
