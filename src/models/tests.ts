export type Test = {};

export type TestRunners = 'Postman' | 'Cypress' | 'Curl';

interface TestsState {
  isLoading?: boolean;
  testsList: Test[];
  filters: {textSearch: string; pageSize: number; tags: string; startDate: null; endDate: null};
  totals: {};
  filtered: {};
  selectedTest?: any | null;
}

export type {TestsState};
