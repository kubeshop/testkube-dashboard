export type TestExecution = {};

interface TestExecutionsState {
  isLoading?: boolean;
  testExecutionsList: TestExecution[];
  filters: {textSearch?: string; pageSize?: number};
  totals: {};
  filtered: {};
  selectedTestExecution?: any | null;
}

export type {TestExecutionsState};
