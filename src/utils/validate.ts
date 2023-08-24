import type {VariableInForm} from '@models/variable';

export const validateDuplicateValueByKey = (value: string, list: VariableInForm[], key: keyof VariableInForm) => {
  let duplicateFlag = false;

  // eslint-disable-next-line no-restricted-syntax
  for (let i in list) {
    if (value === list[i][key] && Boolean(value)) {
      if (duplicateFlag) {
        return true;
      }

      duplicateFlag = true;
    }
  }

  return false;
};
