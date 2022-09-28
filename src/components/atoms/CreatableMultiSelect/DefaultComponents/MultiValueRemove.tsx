import {MultiValueRemoveProps, components} from 'react-select';

import {Option} from '@models/form';

import {ReactComponent as RemoveIcon} from '@assets/closeCircle.svg';

const MultiValueRemove = (props: MultiValueRemoveProps<Option>) => {
  return (
    <components.MultiValueRemove {...props}>
      <RemoveIcon />
    </components.MultiValueRemove>
  );
};

export default MultiValueRemove;
