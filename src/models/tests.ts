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

export type TestFilters = {
  textSearch: string;
  type: string;
  pageSize: number;
  page: number;
  selector: string[];
  createdAt: null;
  status: Array<string>;
};

interface TestsState {
  isLoading?: boolean;
  dataList: Test[];
  latestExecution: any;
  filters: TestFilters;
  totals: {};
  filtered: {};
  selectedTest: Test | null;
}

export type {TestsState};
