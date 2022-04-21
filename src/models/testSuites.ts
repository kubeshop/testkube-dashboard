export type TestSuite = {};

interface TestSuitesState {
  isLoading?: boolean;
  dataList: TestSuite[];
  latestExecution: any;
  filters: {
    textSearch: string;
    pageSize: number;
    page: number;
    selector: string;
    startDate: null;
    endDate: null;
    status: Array<string>;
  };
  totals: {};
  filtered: {};
  selectedTestSuite?: any | null;
}

export type {TestSuitesState};
