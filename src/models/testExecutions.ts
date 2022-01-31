export type TestExecution = {};

interface TestExecutionsState {
  isLoading?: boolean;
  testExecutionsList: TestExecution[];
  filters: {textSearch?: string; pageSize?: number; page: 0; tags: string};
  totals: {};
  filtered: {};
  selectedTestExecution?: any | null;
}

export type {TestExecutionsState};
