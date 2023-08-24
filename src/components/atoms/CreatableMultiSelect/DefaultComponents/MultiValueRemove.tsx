import {MultiValueRemoveProps, components} from 'react-select';

import {ReactComponent as RemoveIcon} from '@assets/closeCircle.svg';

import type {Option} from '@models/form';

export const MultiValueRemove = (props: MultiValueRemoveProps<Option>) => {
  return (
    <components.MultiValueRemove {...props}>
      <RemoveIcon />
    </components.MultiValueRemove>
  );
};
