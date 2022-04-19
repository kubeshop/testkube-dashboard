import {TestExecutor} from './testExecutors';

export type TestName = string;
export type TestContent = string;

export type TestCreationDate = Date;

export type Test = {
  content: TestContent;
  created: TestCreationDate;
  name: TestName;
  type: TestExecutor;
};

interface TestsState {
  isLoading?: boolean;
  dataList: Test[];
  latestExecution: any;
  filters: {textSearch: string; type: string; pageSize: number; page: number; selector: []; createdAt: null};
  totals: {};
  filtered: {};
  selectedTest: Test | null;
}

export type {TestsState};
