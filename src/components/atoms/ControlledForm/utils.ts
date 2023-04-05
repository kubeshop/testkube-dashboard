import {type ValidationError} from 'class-validator';
import {NamePath} from './types';

export const findValidationError = (errors: ValidationError[], namePath: NamePath): ValidationError | null => {
  if (typeof namePath === 'string' || typeof namePath === 'number') {
    namePath = [namePath];
  }

  for (let i = 0; i < errors.length; i += 1) {
    const error = errors[i];

    // not strict equal, to easily handle number == string
    // eslint-disable-next-line
    if (error.property == namePath[0]!) {
      if (namePath.length === 1) {
        return error;
      }
      return findValidationError(error.children || [], namePath.slice(1));
    }
  }
  return null;
};
