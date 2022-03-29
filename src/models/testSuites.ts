export type TestSuite = {};

export type TestRunners = 'Postman' | 'Cypress' | 'Curl';

interface TestSuitesState {
  isLoading?: boolean;
  dataList: TestSuite[];
  filters: {textSearch: string; pageSize: number; page: number; selector: string; startDate: null; endDate: null};
  totals: {};
  filtered: {};
  selectedTestSuite?: any | null;
}

export type {TestSuitesState};
