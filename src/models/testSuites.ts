export type TestSuite = {};

export type UnknownTestRunner = 'Unknown test type';
export type TestRunners = 'Postman' | 'Cypress' | 'Curl' | UnknownTestRunner;

interface TestSuitesState {
  isLoading?: boolean;
  dataList: TestSuite[];
  latestExecution: any;
  filters: {textSearch: string; pageSize: number; page: number; selector: string; startDate: null; endDate: null};
  totals: {};
  filtered: {};
  selectedTestSuite?: any | null;
}

export type {TestSuitesState};
