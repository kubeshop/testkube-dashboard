export type TestSuite = {};

export type TestRunners = 'Postman' | 'Cypress' | 'Curl';

interface TestsSuitesState {
  isLoading?: boolean;
  dataList: TestSuite[];
  filters: {textSearch: string; pageSize: number; page: number; tags: string; startDate: null; endDate: null};
  totals: {};
  filtered: {};
  selectedTestSuite?: any | null;
}

export type {TestsSuitesState};
