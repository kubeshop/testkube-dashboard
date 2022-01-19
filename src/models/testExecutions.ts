export type TestExecution = {};

interface TestExecutionsState {
  isLoading?: boolean;
  testExecutionsList: TestExecution[];
  filters: {textSearch?: string; pageSize?: number; tags: string};
  totals: {};
  filtered: {};
  selectedTestExecution?: any | null;
}

export type {TestExecutionsState};
