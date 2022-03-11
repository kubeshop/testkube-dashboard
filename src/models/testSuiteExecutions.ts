export type TestSuiteExecution = {};

interface TestSuiteExecutionsState {
  isLoading?: boolean;
  dataList: TestSuiteExecution[];
  filters: {textSearch?: string; pageSize?: number; page: 0; selector: string};
  totals: {};
  filtered: {};
  selectedTestSuiteExecution?: TestSuiteExecution | null;
}

export type {TestSuiteExecutionsState};
