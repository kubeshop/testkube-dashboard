import {Nullable} from '@models/extendTS';

export type AssertionResultStatusEnum = 'success' | 'error';

export type AssertionResult = {
  name: string;
  status: AssertionResultStatusEnum;
  errorMessage: Nullable<string>;
};
