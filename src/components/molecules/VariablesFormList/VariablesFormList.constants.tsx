import {Variable} from '@models/variable';

export const emptyVariableObject: Variable = {
  type: 0,
  key: '',
  value: '',
};

export const typeOptions = [
  {label: 'Basic', value: 0},
  {label: 'Secret', value: 1},
  {label: 'Secret Reference', value: 'secretRef'},
];

export const duplicateKeyMessage = 'Duplicate key.';
