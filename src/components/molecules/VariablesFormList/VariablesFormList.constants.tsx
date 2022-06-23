import {Variable} from '@models/variable';

import {StyledPopoverContent} from './VariablesFormList.styled';

export const popoverHelpContent = (
  <StyledPopoverContent>If you wish to hide or obfuscate variables, select type Secret.</StyledPopoverContent>
);

export const emptyVariableObject: Variable = {
  type: 0,
  key: '',
  value: '',
};

export const typeOptions = [
  {label: 'Basic', value: 0},
  {label: 'Secret', value: 1},
];

export const duplicateKeyMessage = 'Duplicate key.';
