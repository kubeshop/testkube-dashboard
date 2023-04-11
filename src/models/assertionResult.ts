export type AssertionResultStatusEnum = 'success' | 'error';

export type AssertionResult = {
  name: string;
  status: AssertionResultStatusEnum;
  errorMessage: string | null;
};
