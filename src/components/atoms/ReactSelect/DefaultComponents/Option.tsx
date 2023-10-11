import {OptionProps, components} from 'react-select';

import {Option} from '@models/form';

const MultiValueLabel = (props: OptionProps<Option>) => {
  return <components.Option {...props} />;
};

export default MultiValueLabel;
