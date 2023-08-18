import {ExecutorsState} from '@models/executors';
import {SourcesState} from '@models/sources';
import {TestSuiteFilters, TestSuitesState} from '@models/testSuite';

export const initialPageSize = 20;

export const initialTestSuitesFiltersState: TestSuiteFilters = {
  textSearch: '',
  pageSize: initialPageSize,
  page: 0,
  selector: [],
  startDate: null,
  endDate: null,
  status: [],
};

export const initialTestSuitesState: TestSuitesState = {
  isLoading: false,
  dataList: [],
  latestExecution: undefined,
  filters: initialTestSuitesFiltersState,
  totals: {
    results: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  },
  filtered: {
    results: 0,
    passed: 0,
    failed: 0,
    pending: 0,
  },
};

const initialExecutorsState: ExecutorsState = {
  executorsList: [],
  executorsFeaturesMap: {},
  currentExecutor: undefined,
};

const initialSourcesState: SourcesState = {
  sourcesList: [],
  currentSource: undefined,
};

const initialReduxState = {
  testSuites: initialTestSuitesState,
  executors: initialExecutorsState,
  sources: initialSourcesState,
};

export default initialReduxState;
