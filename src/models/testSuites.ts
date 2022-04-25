export type TestSuite = {};

export type TestSuiteFilters = {
  textSearch: string;
  pageSize: number;
  page: number;
  selector: string;
  startDate: null;
  endDate: null;
  status: Array<string>;
};
interface TestSuitesState {
  isLoading?: boolean;
  dataList: TestSuite[];
  latestExecution: any;
  filters: TestSuiteFilters;
  totals: {};
  filtered: {};
  selectedTestSuite?: any | null;
}

export type {TestSuitesState};
