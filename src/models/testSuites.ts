import {Execution} from '@models/execution';

export type TestSuite = {};

export type TestSuiteFilters = {
  textSearch: string;
  pageSize: number;
  page: number;
  selector: string[];
  startDate: null;
  endDate: null;
  status: Array<string>;
};
interface TestSuitesState {
  isLoading?: boolean;
  dataList: TestSuite[];
  latestExecution?: Execution;
  filters: TestSuiteFilters;
  totals: {};
  filtered: {};
  selectedTestSuite?: TestSuite;
}

export type {TestSuitesState};
