import {MultiValueRemoveProps, components} from 'react-select';

import {ReactComponent as RemoveIcon} from '@assets/closeCircle.svg';

import {Option} from '@models/form';

const MultiValueRemove = (props: MultiValueRemoveProps<Option>) => {
  return (
    <components.MultiValueRemove {...props}>
      <RemoveIcon />
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;
