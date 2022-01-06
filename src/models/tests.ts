export type Test = {};

export type TestRunners = 'Postman' | 'Cypress' | 'Curl';

interface TestsState {
  isLoading?: boolean;
  testsList: Test[];
  filters: {};
  totals: {};
  filtered: {};
  selectedTest?: any | null;
}

export type {TestsState};
